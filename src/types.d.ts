type Board = import("./game/Board").Board;
type Player = import("./game/Player").Player;
type Players = import("./game/Players").Players;

type CardState = "HIDDEN" | "MATCH" | "NOT_MATCH" | "FLIPPED" | "OWNED";

interface Card {
  index: number;
  value: string;
  state: CardState;
  owner: Player | null;
}

interface GameOptions {
  cardPairs: number;
  playersNames: string[];
  theme: number;
  onUpdate: () => void;
}

interface MenuOptions {
  onStart: (options: Omit<GameOptions, "onUpdate">) => void;
  onUpdate: () => void;
}

interface BoardOptions {
  pairs: number;
  onClick: (card: Card) => void;
}

interface GameState {
  players: Players;
  board: Board;
}
