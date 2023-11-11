export function loopOverResults(results, t) {
  let max = -Infinity;
  let min = Infinity;

  for (let i = 0; i < t; i++) {
    for (let j = 0; j < 1; j++) {
      max = results[j].newFx > max ? results[j].newFx : max;
      min = results[j].newFx < min ? results[j].newFx : min;
    }
  }
}
