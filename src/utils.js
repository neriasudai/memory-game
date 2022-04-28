/**
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
export function shuffle(array) {
  let randomIndex = 0;
  let currentIndex = array.length;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
