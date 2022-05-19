// @ts-check
/// <reference types="../types" />

import { shuffle } from "../utils.js";

// ABCDEFGHIJKLMNOPQRSTUVWXYZ
const LETTERS = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ";

export class Board {
  // properties
  // state

  /** @type {Card[]} */
  cards = [];

  /** @type {HTMLDivElement}   */
  element = null;

  /** @type {Map<Card, HTMLDivElement >}   */
  $cards = new Map();

  /** @type {BoardOptions["onClick"]}  */
  onclick;

  /**
   * @param {BoardOptions} options
   */
  constructor(options) {
    const { pairs, onClick } = options;
    this.onClick = onClick;
    const initialCards = LETTERS.slice(0, pairs).split("");
    this.cards = shuffle([...initialCards, ...initialCards]).map(
      (value, index) => ({
        index,
        value,
        state: "HIDDEN",
        owner: null,
      })
    );
  }

  /** @param {HTMLElement} parent */
  init(parent) {
    this.element = document.createElement("div");
    this.element.classList.add("board");
    parent.appendChild(this.element);

    for (const card of this.cards) {
      const $card = document.createElement("div");
      $card.classList.add("card");
      $card.innerHTML = `
      <div class="content">
        <div class="front">
          <div class="value left top">${card.value}</div>
          <div class="value left bottom">${card.value}</div>
          <div class="value right bottom">${card.value}</div>
          <div class="value right top">${card.value}</div>
          <div class="value center">${card.value}</div>
        </div>
        <div class="back"></div>
      </div>
      `;
      this.element.appendChild($card);
      this.$cards.set(card, $card);
      $card.addEventListener("click", () => {
        if (card.state === "HIDDEN") this.onClick(card);
      });
    }
  }

  /** @param {HTMLElement} parent */
  draw(parent) {
    if (!this.element) this.init(parent);
    for (const [card, $card] of this.$cards.entries()) {
      $card.className = "card";
      switch (card.state) {
        case "HIDDEN":
          $card.classList.add("hidden");
          break;
        case "MATCH":
          $card.classList.add("match");
          break;
        case "NOT_MATCH":
          $card.classList.add("not-match");
          break;
        case "FLIPPED":
          $card.classList.add("filpped");
          break;
        case "OWNED":
          $card.classList.add("owned");
          break;
      }

      if (card.owner !== null) {
        $card.classList.add(`player${card.owner.index}`);
      }
    }
  }
}
