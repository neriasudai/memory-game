let cards = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// console.log(cards.length);

let fullCards = cards.concat(cards);
console.log(fullCards);
cards = cards.concat(cards);
console.log(cards.length);
let nArr = [];
for (let c of fullCards) {
  let index = Math.floor(Math.random() * cards.length);
  nArr.push(cards[index]);
  cards.splice(index, 1);
}

console.log(nArr);

let board = document.querySelector(".root");

for (let c of nArr) {
  let card = document.createElement("div");
  card.textContent = c;
  card.classList.add("card");
  board.appendChild(card);
}
