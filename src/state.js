//@ts-check
import { shuffle } from "./utils.js";

// const initialCards = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
// const initialCards = "ABCDE".split("");
// const initialCards = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ".split("");
const initialCards = "ΑΒΓΔΕΖΗ".split("");

/**
 * @typedef {'HIDDEN' | 'MATCH' | 'NOT_MATCH' | 'FLIPPED' | 'OWNED'} CardState
 * @typedef {{ index: number; value: string; state: CardState; owner: Player | null; }} Card
 * @typedef {{ name: string; index: number }} Player
 */

/**
 * @type {Card[]}
 */
const board = shuffle([...initialCards, ...initialCards]).map(
  (value, index) => ({
    index,
    value,
    state: "HIDDEN",
    owner: null,
  })
);

/**
 * @type {Player[]}
 */
const players = ["Ilan", "Neria"].map((name, index) => ({
  name,
  index: index + 1,
}));

export const state = {
  board,
  players,
  currentPlayer: players[0],
  nextPlayer: function () {
    let n = players.indexOf(this.currentPlayer) + 1;
    n = n >= players.length ? 0 : n;
    this.currentPlayer = players[n];
  },
};
