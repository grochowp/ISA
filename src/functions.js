export function CreateXReal1(a, b, d) {
  return (Math.random() * (b - a) + a).toFixed(d);
  // return -2.627;
}
export function RealToInt(a, b, x, l) {
  return Math.floor((1 / (b - a)) * (x - a) * (Math.pow(2, l) - 1));
}
export function IntToBin(x, l) {
  return (x >>> 0).toString(2).padStart(l, "0");
}
export function BinToInt(x) {
  return parseInt(x, 2);
}
export function IntToReal(a, b, x, l, d) {
  return ((x * (b - a)) / (Math.pow(2, l) - 1) + a).toFixed(d);
}
export function RealToFX(x) {
  return (x % 1) * (Math.cos(20 * Math.PI * x) - Math.sin(x));
}

///////////////////////////////////// lab2

export function LpToFx(a, b, d, n, l) {
  let newResults = [];

  for (let i = 0; i < n; i++) {
    const xReal1 = CreateXReal1(Number(a), Number(b), d);
    const fX = RealToFX(xReal1);

    const newResult = {
      lp: i + 1,
      xReal1,
      fX,
    };
    newResults.push(newResult);
  }
  return newResults;
}

export function FxToGx(results, d, minmax) {
  const max = Math.max(...results.map((obj) => obj.fX));
  const min = Math.min(...results.map((obj) => obj.fX));

  for (let i = 0; i < results.length; i++) {
    if (minmax === "max") {
      results[i].gX = results[i].fX - min + d;
    }
    if (minmax === "min") {
      results[i].gX = -1 * (results[i].fX - max) + d;
    }
  }
  return results;
}

export function GxToPi(results) {
  // Gi / suma G wszystkich
  const sum = results.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.gX;
  }, 0);
  // Pi
  for (let i = 0; i < results.length; i++) {
    results[i].Pi = results[i].gX / sum;
  }
  return results;
}

export function PiToR(results) {
  for (let i = 0; i < results.length; i++) {
    // R
    results[i].r = Math.random().toFixed(2);
    // Qi
    if (i === 0) results[i].Qi = results[i].Pi;
    else results[i].Qi = results[i - 1].Qi + results[i].Pi;
  }
  return results;
}

export function RToParents(results, a, b, l) {
  for (let i = 0; i < results.length; i++) {
    // xBin
    const xInt = RealToInt(a, b, results[i].xReal1, l);
    const xBin = IntToBin(xInt, l);

    // xRealSelected warunkowe dla i = 0
    if (i === 0 && results[i].Qi > results[i].r) {
      results[i].xRealSelected = results[i].xReal1;
      // Parents jesli xRealSelected istnieje
      results[i].xBin = xBin;
      results[i].parents = xBin;
      results[i].Pc = 1;
    }
    // xRealSelected warunkowe dla i > 0
    else if (
      i > 0 &&
      results[i - 1].Qi < results[i].r &&
      results[i].r <= results[i].Qi
    ) {
      results[i].xRealSelected = results[i].xReal1;
      results[i].xBin = xBin;
      results[i].parents = xBin;
    }
  }

  return results;
}

export function ParentsToKids(results, l) {
  let RandomPc = (Math.random() * (l - 4) + 2).toFixed(0);
  let counter = 1;
  let tempBin1;
  let tempBin2;
  let tempBin1Index;
  let tempBin2Index;

  for (let i = 0; i < results.length; i++) {
    if (results[i].xRealSelected) {
      results[i].Pc = RandomPc;
      counter++;

      tempBin1 = results[i].xBin;
      tempBin1Index = results[i].lp;
    } else if (tempBin1 && !tempBin2) {
      tempBin2 = results[i].xBin;
      tempBin2Index = results[i].lp;
      results[i].kids =
        tempBin2.substring(0, results[i].Pc) +
        tempBin1.substring(results[i].Pc);
      results[tempBin1Index - 1].kids =
        tempBin1.substring(0, results[i].Pc) +
        tempBin2.substring(results[i].Pc);
      tempBin1 = "";
      tempBin2 = "";
    }
  }
}
