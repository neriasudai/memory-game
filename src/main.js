// @ts-check
import { Game } from "./game/Game.js";
import { Menu } from "./menu/Menu.js";

const root = document.getElementById("root");

/** @typedef {Menu | Game} Mode */

/** @type {Mode} */
let mode = null;

/** @param {Mode} nextMode*/
function render(nextMode = mode) {
  if (nextMode !== mode) {
    mode = nextMode;
    root.innerHTML = "";
  }

  nextMode.draw(root);
}

render(
  new Menu({
    onUpdate: render,
    onStart: (options) => {
      const game = new Game({
        ...options,
        onUpdate: render,
      });

      render(game);
    },
  })
);
