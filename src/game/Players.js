import { Player } from "./Player.js";

export class Players {
  /** @type {Player[]} */
  players;

  /** @type {Player} */
  current;

  /**
   * @param {string[]} names
   */
  constructor(names) {
    this.players = names.map((name, index) => new Player(name, index));
    this.current = this.players[0];
  }

  /** @type {HTMLDivElement}   */
  element = null;

  next() {
    let n = this.players.indexOf(this.current) + 1;
    n = n >= this.players.length ? 0 : n;
    this.current = this.players[n];
  }

  /** @param {HTMLDivElement} parent */
  init(parent) {
    this.element = document.createElement("div");
    this.element.classList.add("players");
    parent.appendChild(this.element);
  }

  /**
   * @param {HTMLDivElement} parent
   * @param {GameState} state
   */
  draw(parent, state) {
    if (this.element == null) this.init(parent);
    this.players.forEach((player) => {
      const playerCards = state.board.cards.filter((d) => d.owner === player);
      player.draw(this.element, playerCards, this.current === player);
    });
  }
}
