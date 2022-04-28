// @ts-check

import { state } from "./state.js";

/**
 * @param {import('./state').Card} card
 */
function onCardClick(card) {
  card.state = "FLIPPED";
  const cards = state.board.filter(
    (d) => d.state !== "HIDDEN" && d.owner === null
  );
  if (cards.length > 2) {
    card.state = "HIDDEN";
    return;
  } else if (cards.length === 2) {
    console.log();
    const match = cards[0].value === cards[1].value;
    cards.forEach((c) => {
      c.state = match ? "MATCH" : "NOT_MATCH";
    });
    render();
    setTimeout(() => {
      if (match) {
        cards.forEach((c) => {
          c.owner = state.currentPlayer;
          c.state = "OWNED";
        });
      } else {
        cards.forEach((c) => {
          c.owner = null;
          c.state = "HIDDEN";
        });
        state.nextPlayer();
      }
      render();
    }, 2000);
  } else {
    render();
  }
}

const $board = document.querySelector(".board");
const $players = document.querySelector(".players");
/**
 * @type { Map<Element, import('./state').Card>}
 */
const $cards = new Map();

function createBoard() {
  $board.innerHTML = "";
  $cards.clear();
  state.board.forEach((card) => {
    const $card = document.createElement("div");
    $card.classList.add("card");
    $cards.set($card, card);
    $card.addEventListener("click", () => {
      if (card.state === "HIDDEN") onCardClick(card);
    });
    $card.textContent = card.value;
    $board.appendChild($card);
  });
}

function render() {
  for (const [$card, card] of $cards.entries()) {
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

    // const gameOver = state.board.filter((d) => d.owner == null).length === 0;
  }

  $players.innerHTML = "";
  state.players.forEach((player) => {
    const $player = document.createElement("div");
    $player.classList.add("player");
    $player.classList.add(`player${player.index}`);
    const score = state.board.filter((d) => d.owner === player).length;
    $player.textContent = `Player ${player.name}: ${score}`;
    $players.appendChild($player);
  });

  const $current = document.createElement("div");
  $current.classList.add("player");
  $current.classList.add(`player${state.currentPlayer.index}`);
  $current.textContent = `Current player: ${state.currentPlayer.name}`;

  $players.appendChild($current);

  console.log(state.currentPlayer);
}

createBoard();
render();
