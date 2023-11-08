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

export function GxToR(results) {
  // Gi / suma G wszystkich
  const sum = results.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.gX;
  }, 0);

  for (let i = 0; i < results.length; i++) {
    // Pi
    results[i].Pi = results[i].gX / sum;

    // R
    results[i].r = Math.random().toFixed(2);

    // Qi
    if (i === 0) results[i].Qi = results[i].Pi;
    else results[i].Qi = results[i - 1].Qi + results[i].Pi;
  }

  return results;
}

export function rToPc(results, a, b, l, pk, n) {
  let RandomPc = (Math.random() * (l - 4) + 2).toFixed(0);
  let counter = 1;
  let counterParents = 0;
  let xInt;
  let xBin;

  for (let i = 0; i < results.length; i++) {
    if (counter % 2) RandomPc = (Math.random() * (l - 2) + 1).toFixed(0);

    //xRealSelected
    for (let j = 0; j <= results.length; j++) {
      if (j === 0 && results[i].r <= results[j].Qi) {
        results[i].xRealSelected = results[j].xReal1;
      } else if (
        j >= 1 &&
        results[i].r > results[j - 1]?.Qi &&
        results[i].r <= results[j]?.Qi
      ) {
        results[i].xRealSelected = results[j].xReal1;
      }
    }

    // xBin
    xInt = RealToInt(a, b, results[i].xReal1, l);
    xBin = IntToBin(xInt, l);
    results[i].xBin = xBin;

    // parents i Pc
    const randomNumber = Math.random();
    if (randomNumber < pk) {
      results[i].parents = results[i].xBin;
      results[i].Pc = RandomPc;
      counter++;
      counterParents++;
    }
  }
  if (counterParents < 2 && n > 1) rToPc(results, a, b, l, pk);
  return results;
}

export function PcToKids(results) {
  let firstParent;
  let secondParent;
  let firstParentIndex;
  let secondParentIndex;
  const parentsArray = [];

  for (let i = 0; i < results.length; i++) {
    // Jeśli istnieją rodzice to zapamiętuje wartosc najpierw pierwszego(firstParent), później drugiego(secondParent)
    // results[i].kids = results[i].
    if (!results[i].parents) results[i].kids = results[i].xBin;
    else if (!firstParent) {
      firstParent = results[i]?.parents;
      firstParentIndex = results[i].lp - 1;
      // dodaje indeks rodzica do arrayu
      parentsArray.push(firstParentIndex);
    } else if (firstParent && !secondParent) {
      secondParent = results[i]?.parents;

      if (secondParent) {
        secondParentIndex = results[i].lp - 1;
        //prettier-ignore
        results[i].kids = secondParent.substring(0, results[i].Pc) + firstParent.substring(results[i].Pc);
        //prettier-ignore
        results[firstParentIndex].kids = firstParent.substring(0, results[i].Pc) + secondParent.substring(results[i].Pc);
        // dodaje indeks rodzica do arrayu
        parentsArray.push(results[i].lp - 1);
        // jesli istnial drugi rodzic to powstały dzieci i xBiny rodziców zostają usunięte z pamięci
        firstParent = "";
        secondParent = "";
      }
    }
  }
  // Sprawdza czy istnieje zapisany xBin pierwszego rodzica i indeks drugiego (tzn czy w programie wylosowało
  // nieparzystą liczbę xRealSelected, większą od 1)
  if (firstParent && secondParentIndex) {
    // losuje indeks z przedzialu od 0 do długości arrayu z indeksami poprzednich rodziców po czym przypisuje losowego rodzica
    const randomIndex = Math.floor(Math.random() * (parentsArray.length - 1));

    // prettier-ignore
    const randomParent = parentsArray[randomIndex];

    // Jeśli jest nieparzysta ilość rodziców, ostatni łączy się z losowym z poprzednich par
    //prettier-ignore
    results[firstParentIndex].kids = results[firstParentIndex].parents.substring(0, results[firstParentIndex].Pc) +
    results[randomParent].parents.substring(results[firstParentIndex].Pc);
  }
  return results;
}

export function KidsToFX(results, pm, a, b, l, d) {
  results.forEach((result, i) => {
    // array dla indeksów ktore mają mutowac
    const SelectedIndex = [];
    // array dla nowego xBina(Po mutacji)
    let newXBin = [];
    if (result.kids && result.xBin) {
      result.kids.split("").forEach((digit, index) => {
        const randomNumber = Math.random();
        if (randomNumber < pm) {
          SelectedIndex.push(index);
          // Zmiana wartosci dla indeksów ktore mutują
          newXBin.push(digit === "0" ? "1" : "0");
        } else {
          newXBin.push(result.kids[index]);
        }
      });

      // 4 ostatnie kolumny
      result.pktMutacji = SelectedIndex.join(", ");
      result.xBinPoMutacji = newXBin.join("");

      const tempNewBin = BinToInt(result.xBinPoMutacji, l);
      const tempNewReal = IntToReal(Number(a), Number(b), tempNewBin, l, d);

      result.xRealPoMutacji = tempNewReal;
      result.newFx = RealToFX(result.xRealPoMutacji);
    }
  });

  return results;
}
