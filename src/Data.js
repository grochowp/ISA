import { FxToGx, GxToR, KidsToFX, PcToKids, rToPc } from "./functions-v2";

export function loopOverResults(
  resultsAfter,
  t,
  a,
  b,
  d,
  n,
  l,
  pk,
  pm,
  minmax
) {
  for (let i = 0; i < t; i++) {
    let max = -Infinity;
    let min = Infinity;
    let maxIndex;
    for (let j = 0; j < resultsAfter.length; j++) {
      if (resultsAfter[j].newFx > max) {
        max = resultsAfter[j].newFx;
        maxIndex = resultsAfter[j].lp - 1;
      }
      min = resultsAfter[j].newFx < min ? resultsAfter[j].newFx : min;
    }

    resultsAfter.forEach((el) => {
      el.fX = el.newFx;
      el.xReal1 = el.xRealPoMutacji;
    });
    const randomNumber = Math.floor(Math.random() * resultsAfter.length);

    const tempGx = FxToGx(resultsAfter, d, minmax);
    const tempR = GxToR(tempGx);
    const tempPc = rToPc(tempR, a, b, l, pk, n);
    const tempKids = PcToKids(tempPc);
    const newResultsAfter = KidsToFX(tempKids, pm, a, b, l, d);
  }
  return resultsAfter;
}
