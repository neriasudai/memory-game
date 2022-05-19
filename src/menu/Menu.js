// @ts-check
/// <reference types="../types" />

export class Menu {
  /** @type {MenuOptions["onUpdate"]}   */
  onUpdate;

  /** @type { MenuOptions["onStart"]} */
  onStart;

  /** @type {Set<string>} */
  players = new Set();

  /** @type { HTMLDivElement} */
  element = null;

  /** @param {MenuOptions} options  */
  constructor(options) {
    const { onStart, onUpdate } = options;
    this.onStart = onStart;
    this.onUpdate = onUpdate;
  }
  /** @param {HTMLElement} parent */
  init(parent) {
    this.element = document.createElement("div");
    this.element.classList.add("menu");
    this.element.innerHTML = `
      <div>
        <label>
          Pairs:
          <input class="input-pairs" type="number" min="8  max="12" value="8" />
        </label>
      </div>
      <div>
        <label>
          Theme:
          <input class="input-theme" type="number" min="1  max="5" step="1" value="1" />
        </label>
      </div>
      <div>
        <input class="input-player" type="text" placeholder="Name" />
        <div class="players"></div>
        <button class="button-add">Add</button>
      </div>
      <div>
        <button class="button-start">Start</button>
      </div>
    `;

    parent.appendChild(this.element);

    /** @type {HTMLButtonElement} */
    const $start = this.element.querySelector(".button-start");

    /** @type {HTMLButtonElement} */
    const $add = this.element.querySelector(".button-add");

    /** @type {HTMLInputElement} */
    const $pairs = this.element.querySelector(".input-pairs");

    /** @type {HTMLInputElement} */
    const $player = this.element.querySelector(".input-player");

    /** @type {HTMLInputElement} */
    const $theme = this.element.querySelector(".input-theme");

    $start.addEventListener("click", () => {
      const theme = parseInt($theme.value ?? "1");
      this.onStart({
        cardPairs: parseInt($pairs.value),
        playersNames: [...this.players],
        theme,
      });
    });

    $player.addEventListener("keyup", () => this.onUpdate());

    const addPlayer = () => {
      this.players.add($player.value.trim());
      $player.value = "";
      this.onUpdate();
    };

    $add.addEventListener("click", () => addPlayer());
    $player.addEventListener("keypress", (e) => {
      e.key === "Enter" && addPlayer();
    });
  }

  /** @param {HTMLElement} parent */
  draw(parent) {
    if (this.element == null) this.init(parent);

    /** @type {HTMLButtonElement} */
    const $start = this.element.querySelector(".button-start");

    /** @type {HTMLButtonElement} */
    const $add = this.element.querySelector(".button-add");

    /** @type {HTMLInputElement} */
    const $player = this.element.querySelector(".input-player");

    /** @type {HTMLInputElement} */
    const $players = this.element.querySelector(".players");

    $start.disabled = this.players.size === 0;
    $add.disabled =
      $player.value === "" && !this.players.has($player.value.trim());

    $players.innerHTML = [...this.players].join(", ");
  }
}
