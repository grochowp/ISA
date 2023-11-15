import {
  FxToGx,
  GxToR,
  KidsToFX,
  PcToKids,
  createFx,
  rToPc,
} from "./functions-v2";

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
  minmax,
  elite
) {
  const fMax = [];
  const fMin = [];
  const fMid = [];
  const resultsSorted = [];
  for (let i = 0; i < t; i++) {
    let sumFX =
      resultsAfter.reduce((sum, obj) => sum + obj.fX, 0) / resultsAfter.length;
    let max = -Infinity;
    let min = Infinity;
    let maxXReal;
    let maxIndex;

    for (let j = 0; j < resultsAfter.length; j++) {
      if (resultsAfter[j].fX > max) {
        max = resultsAfter[j].fX;
        maxIndex = resultsAfter[j].lp;
        maxXReal = resultsAfter[j].xReal;
      }
      min = resultsAfter[j].fX < min ? resultsAfter[j].fX : min;
    }

    fMid.push(sumFX);
    fMax.push(max);
    fMin.push(min);

    if (fMax.length === 1 || (fMax[i] >= fMax[i - 1] && elite === true)) {
      const sameObject = resultsAfter.find(
        (el) => el.newFx === max && el.lp === maxIndex
      );
      const selectedObject = resultsAfter.find(
        (el) => el.newFx === max && el.lp !== maxIndex
      );

      if (sameObject) {
        resultsAfter[sameObject.lp].xRealPoMutacji = maxXReal;
      } else if (!selectedObject && !sameObject) {
        let availableIndices = resultsAfter
          .filter((el) => el.lp !== maxIndex)
          .map((el) => el.lp);

        let randomIndex;
        do {
          if (availableIndices.length === 0) break;

          randomIndex =
            availableIndices[
              Math.floor(Math.random() * availableIndices.length)
            ];

          const currentIndex = resultsAfter[randomIndex].lp;

          if (resultsAfter[currentIndex].newFx >= max) {
            availableIndices = availableIndices.filter(
              (index) => index !== currentIndex
            );
          }
        } while (resultsAfter[randomIndex].newFx >= max);

        resultsAfter[randomIndex].xRealPoMutacji = maxXReal;
      } else {
        resultsAfter[selectedObject.lp].xRealPoMutacji = maxXReal;
      }
    } else if (fMax[i] < fMax[i - 1] && elite === true) {
      i--;
      resultsAfter.forEach((el) => {
        // el.fX = el.newFx;
        el.xReal = el.xRealPoMutacji;
      });
      fMax.pop();
      fMin.pop();
      fMid.pop();
    }

    resultsAfter.forEach((el) => {
      el.xReal = el.xRealPoMutacji;
    });

    const tempFx = createFx(resultsAfter);
    const tempGx = FxToGx(tempFx, d, minmax);
    const tempR = GxToR(tempGx);
    const tempPc = rToPc(tempR, a, b, l, pk, n);
    const tempKids = PcToKids(tempPc);
    const newResultsAfter = KidsToFX(tempKids, pm, a, b, l, d);
    resultsAfter = newResultsAfter;
  }

  const findIndexInSummary = (array, xReal, xBin, fX) => {
    return array.findIndex((item) => item.xReal === xReal && item.fX === fX);
  };
  const percResult = [...resultsAfter];

  percResult.forEach((obj) => {
    const { xReal, xBin, fX } = obj;

    const indexInSummary = findIndexInSummary(resultsSorted, xReal, xBin, fX);

    if (indexInSummary !== -1) {
      resultsSorted[indexInSummary].percentage += (1 / percResult.length) * 100;
    } else {
      resultsSorted.push({
        xReal: xReal,
        xBin: xBin,
        fX: fX,
        percentage: (1 / percResult.length) * 100,
      });
    }
  });

  resultsSorted.sort((a, b) => b.percentage - a.percentage);

  for (let i = 0; i < resultsSorted.length; i++) {
    resultsSorted[i].lp = i + 1;
  }
  return [resultsSorted, fMax, fMid, fMin];
}
