// @ts-check
/// <reference types="../types" />

import { Board } from "./Board.js";
import { Players } from "./Players.js";

const CARD_FLIP_DURATION = 1200;

export class Game {
  /** @type {number} */
  theme;

  /** @type {GameState} */
  state;

  /** @type {HTMLDivElement}   */
  element = null;

  /** @type {GameOptions["onUpdate"]}   */
  onUpdate;

  /** @param {GameOptions} options  */
  constructor(options) {
    const { cardPairs, playersNames, onUpdate, theme } = options;

    this.theme = theme;
    this.onUpdate = onUpdate;

    const players = new Players(playersNames);
    const board = new Board({
      pairs: cardPairs,
      onClick: this.onClick.bind(this),
    });

    this.state = {
      players,
      board,
    };
  }

  /** @param {Card} card */
  onClick(card) {
    card.state = "FLIPPED";
    const cards = this.state.board.cards.filter(
      (d) => d.state !== "HIDDEN" && d.owner === null
    );
    if (cards.length > 2) {
      card.state = "HIDDEN";
      return;
    } else if (cards.length === 2) {
      const match = cards[0].value === cards[1].value;
      cards.forEach((c) => {
        c.state = match ? "MATCH" : "NOT_MATCH";
      });
      this.onUpdate();
      setTimeout(() => {
        if (match) {
          cards.forEach((c) => {
            c.owner = this.state.players.current;
            c.state = "OWNED";
          });
        } else {
          cards.forEach((c) => {
            c.owner = null;
            c.state = "HIDDEN";
          });
          this.state.players.next();
        }
        this.onUpdate();
      }, CARD_FLIP_DURATION);
    } else {
      this.onUpdate();
    }
  }

  /** @param {HTMLElement} parent */
  draw(parent) {
    if (!this.element) {
      this.element = document.createElement("div");
      this.element.classList.add("game");
      this.element.classList.add(`theme-${this.theme}`);
      parent.appendChild(this.element);
    }

    this.state.players.draw(this.element, this.state);
    this.state.board.draw(this.element);
  }
}
