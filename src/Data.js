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
  const fMax = [];
  const fMin = [];

  for (let i = 0; i < t; i++) {
    let max = -Infinity;
    let min = Infinity;
    let maxXReal;
    let maxIndex;
    let selectedIndex;
    for (let j = 0; j < resultsAfter.length; j++) {
      if (resultsAfter[j].newFx > max) {
        max = resultsAfter[j].newFx;
        maxIndex = resultsAfter[j].lp - 1;
        maxXReal = resultsAfter[j].xRealPoMutacji;
      }
      min = resultsAfter[j].newFx < min ? resultsAfter[j].newFx : min;
    }

    fMax.push(max);
    fMin.push(min);

    if (fMax.length === 1 || fMax[i] >= fMax[i - 1]) {
      const selectedObject = resultsAfter.find(
        (el) => el.newFx === max && el.lp - 1 !== maxIndex
      );

      // console.log(selectedObject);

      if (!selectedObject) {
        let availableIndices = resultsAfter
          .filter((el) => el.lp !== maxIndex)
          .map((el) => el.lp - 1);

        let randomIndex;
        do {
          if (availableIndices.length === 0) break;

          randomIndex =
            availableIndices[
              Math.floor(Math.random() * availableIndices.length)
            ];

          const currentIndex = randomIndex;
          if (resultsAfter[currentIndex].newFx >= max) {
            availableIndices = availableIndices.filter(
              (index) => index !== currentIndex
            );
          }
        } while (resultsAfter[randomIndex].newFx >= max);

        selectedIndex = randomIndex;
        resultsAfter[randomIndex].newFx = max;
      } else {
        resultsAfter.forEach((el) => {
          el.fX = el.newFx;
          el.xReal1 = el.xRealPoMutacji;
        });
      }

      resultsAfter.forEach((el) => {
        if (el.lp - 1 !== selectedIndex) {
          el.fX = el.newFx;
          el.xReal1 = el.xRealPoMutacji;
        } else {
          el.fX = max;
          el.xReal1 = maxXReal;
        }
      });
    } else {
      i--;
      resultsAfter.forEach((el) => {
        el.fX = el.newFx;
        el.xReal1 = el.xRealPoMutacji;
      });
      fMax.pop();
      fMin.pop();
    }

    const tempGx = FxToGx(resultsAfter, d, minmax);
    const tempR = GxToR(tempGx);
    const tempPc = rToPc(tempR, a, b, l, pk, n);
    const tempKids = PcToKids(tempPc);
    const newResultsAfter = KidsToFX(tempKids, pm, a, b, l, d);
    resultsAfter = newResultsAfter;
    // console.log(fMax, fMin);
  }
  return resultsAfter;
}
