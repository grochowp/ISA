export function CreateXReal1(a, b, d) {
  return (Math.random() * (b - a) + a).toFixed(d);
  // return -2.627;
}
export function RealToInt(a, b, x, l, d) {
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

export function LpToFx(a, b, d, n) {
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

  for (let i = 0; i < results.length; i++) {
    results[i].Pi = results[i].gX / sum;
  }
  return results;
}

export function PiToR(results) {
  for (let i = 0; i < results.length; i++) {
    results[i].r = Math.random().toFixed(2); // R before Qi
    if (i === 0) results[i].Qi = results[i].Pi;
    else results[i].Qi = results[i - 1].Qi + results[i].Pi;
  }
  return results;
}

export function RToXRealSelected(results) {
  for (let i = 0; i < results.length; i++) {
    if (i === 0) {
      results[i].xRealSelected =
        results[i].Qi > results[i].r ? results[i].xReal1 : "-";
    } else {
      results[i].xRealSelected =
        results[i - 1].Qi < results[i].r && results[i].r <= results[i].Qi
          ? results[i].xReal1
          : "-";
    }
  }
  return results;
}
