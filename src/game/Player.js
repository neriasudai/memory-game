// @ts-check
/// <reference types="../types" />

export class Player {
  /** @type {string} */
  name;

  /** @type {number} */
  index;

  /** @type {HTMLDivElement}   */
  element = null;

  /**
   * @param {string} name
   * @param {number} index
   */
  constructor(name, index) {
    this.name = name;
    this.index = index;
  }

  /** @param {HTMLDivElement} parent */
  init(parent) {
    this.element = document.createElement("div");
    this.element.classList.add("player");
    this.element.classList.add(`player${this.index}`);
    parent.appendChild(this.element);
  }

  /**
   *
   * @param {HTMLDivElement} parent
   * @param {Card[]} cards
   * @param {boolean} active
   */
  draw(parent, cards, active) {
    if (this.element == null) this.init(parent);
    const score = cards.length;
    if (active) {
      this.element.classList.add("active");
    } else {
      this.element.classList.remove("active");
    }

    this.element.innerHTML = `
      <div>${this.name}</div>
      <div>${score}</div>
      `;
  }
}
