import { useState } from "react";
import {
  LpToFx,
  FxToGx,
  PcToKids,
  KidsToFX,
  rToPc,
  GxToR,
} from "./model/functions-v2";
import { Table } from "./view/Table";
import { TableAfter } from "./view/TableAfter";
import { loopOverResults } from "./model/Data";
import { Graph } from "./view/Graph";
import { Tests } from "./view/Tests";

export default function App() {
  const [a, setA] = useState(-4);
  const [b, setB] = useState(12);
  const [d, setD] = useState(3);
  const [n, setN] = useState(50);
  const [t, setT] = useState(100);
  const [pk, setPk] = useState(0.85);
  const [pm, setPm] = useState(0.005);
  const [minmax, setMinmax] = useState("max");

  const [results, setResults] = useState([]);
  const [resultsAfter, setResultsAfter] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [dataGraph, setDataGraph] = useState({});

  const [elite, setElite] = useState(true);
  const [displayResults, setDisplayResults] = useState(false);
  const [displayGraph, setDisplayGraph] = useState(false);
  const [displayTests, setDisplayTests] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [enableButtons, setEnableButtons] = useState(true);

  const dMultiplier = d === 1 ? 0.1 : d === 2 ? 0.01 : 0.001;
  const l = Math.ceil(Math.log2((b - a) / dMultiplier) + 1);

  function handleStart() {
    setEnableButtons(false);
    displayResults && setDisplayResults(false);
    displayGraph && setDisplayGraph(false);
    displayTests && setDisplayTests(false);
    !displayData && setDisplayData(true);

    const tempFx = LpToFx(a, b, d, n, l);
    const tempGx = FxToGx(tempFx, dMultiplier, minmax);
    const tempParents = GxToR(tempGx);
    const tempSelected = rToPc(tempParents, a, b, l, pk, n);
    const tempKids = PcToKids(tempSelected, l);
    const newResults = KidsToFX(tempKids, pm, a, b, l, d);

    setResults(() => newResults);

    const [newResultsAfter, fMax, fMid, fMin] = loopOverResults(
      newResults,
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
    );

    const resultArray = fMax.map((maxObj, index) => ({
      max: maxObj,
      mid: fMid[index],
      min: fMin[index],
      name: `pokolenie ${index + 1}`,
    }));

    setDataGraph(resultArray);
    setResultsAfter(() => newResultsAfter);
  }

  async function handleTests() {
    !displayTests && setDisplayTests(true);
    displayGraph && setDisplayGraph(false);
    displayResults && setDisplayResults(false);
    displayData && setDisplayData(false);

    const nValues = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
    const pkValues = [0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9];
    const pmValues = [
      0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008, 0.009, 0.01,
    ];
    const tValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];

    // const nValues = [30, 35];
    // const pkValues = [0.5, 0.55];
    // const pmValues = [0.0001, 0.0005];
    // const tValues = [50, 60];

    let bestResults = [];

    async function runIterations(n, pk, pm, t) {
      let maxFx = [];
      for (let i = 0; i < 100; i++) {
        const tempFx = LpToFx(a, b, d, n, l);
        const tempGx = FxToGx(tempFx, dMultiplier, minmax);
        const tempParents = GxToR(tempGx);
        const tempSelected = rToPc(tempParents, a, b, l, pk, n);
        const tempKids = PcToKids(tempSelected, l);
        const newResults = KidsToFX(tempKids, pm, a, b, l, d);

        await new Promise((resolve) => setTimeout(resolve, 0));

        const [newResultsAfter] = loopOverResults(
          newResults,
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
        );

        const maxfX = Math.max(...newResultsAfter.map((result) => result.fX));

        // const fXArray = newResultsAfter.map((result) => result.fX);
        // const sumfX = fXArray.reduce((sum, fX) => sum + fX, 0);
        // const averagefX = sumfX / fXArray.length;

        maxFx.push(maxfX);
      }
      const averageMaxFx =
        maxFx.reduce((sum, value) => sum + value, 0) / maxFx.length;
      const maxMaxFx = Math.max(...maxFx);

      bestResults.push({
        n,
        pk,
        pm,
        t,
        maxFx: maxMaxFx,
        avgfX: averageMaxFx,
      });
    }

    for (let n of nValues) {
      for (let pk of pkValues) {
        for (let pm of pmValues) {
          for (let t of tValues) {
            setN(() => n);
            setT(() => t);
            setPk(() => pk);
            setPm(() => pm);

            await runIterations(n, pk, pm, t);
          }
        }
      }
    }

    bestResults.sort((a, b) => {
      if (b.avgfX !== a.avgfX) {
        return b.avgfX - a.avgfX;
      } else {
        return b.maxFx - a.maxFx;
      }
    });
    const top50Results = bestResults.slice(0, 50);

    for (let i = 0; i < top50Results.length; i++) {
      top50Results[i].lp = i + 1;
    }

    setTestResults(top50Results);
  }

  function handleCheckboxChange() {
    setElite(() => !elite);
  }

  function handleStarter() {
    !displayResults && setDisplayResults(true);
    displayGraph && setDisplayGraph(false);
    displayTests && setDisplayTests(false);
    displayData && setDisplayData(false);
  }

  function handleData() {
    !displayData && setDisplayData(true);
    displayGraph && setDisplayGraph(false);
    displayTests && setDisplayTests(false);
    displayResults && setDisplayResults(false);
  }

  function handleGraph() {
    !displayGraph && setDisplayGraph(true);
    displayResults && setDisplayResults(false);
    displayTests && setDisplayTests(false);
    displayData && setDisplayData(false);
  }

  // function handleTests() {
  //   !displayTests && setDisplayTests(true);
  //   displayGraph && setDisplayGraph(false);
  //   displayResults && setDisplayResults(false);
  //   displayData && setDisplayData(false);
  // }
  return (
    <>
      <div className="inputs">
        <span>
          a = <Inputs variab={a} setVar={setA} />
        </span>
        <span>
          b = <Inputs variab={b} setVar={setB} />
        </span>
        <span>
          d = <SelectBar d={d} setD={setD} />
        </span>
        <span>
          N = <Inputs variab={n} setVar={setN} />
        </span>
        <span>
          T = <Inputs variab={t} setVar={setT} />
        </span>
        <span>
          min/max =
          <select
            className="inputBox"
            value={minmax}
            onChange={(e) => setMinmax(e.target.value)}
          >
            <option value="min">min</option>
            <option value="max">max</option>
          </select>
        </span>
        <span>
          pK = <Inputs variab={pk} setVar={setPk} />
        </span>
        <span>
          pM = <Inputs variab={pm} setVar={setPm} />
        </span>
        <span>
          <label>
            Elite:
            <input
              type="checkbox"
              checked={elite}
              onChange={handleCheckboxChange}
            />
          </label>
        </span>
        <span>
          <button onClick={handleStart}>START</button>
        </span>
      </div>
      <div className="choose">
        {/* <span>
          <button onClick={handleStarter}>TABELKA</button>
        </span> */}
        <span>
          <button disabled={enableButtons} onClick={handleData}>
            DANE
          </button>
        </span>
        <span>
          <button disabled={enableButtons} onClick={handleGraph}>
            WYKRES
          </button>
        </span>
        <span>
          <button disabled={dataGraph.length === 0} onClick={handleTests}>
            URUCHOM TESTY
          </button>
        </span>
      </div>

      {/* {displayResults && (
        <div>
          <br />
          <Table results={results} />
        </div>
      )} */}

      {displayData && (
        <div>
          <br />
          <TableAfter results={resultsAfter} />
        </div>
      )}

      {displayGraph && (
        <div>
          <br />
          <Graph dataGraph={dataGraph} />
        </div>
      )}

      {displayTests && (
        <div>
          <br />
          <Tests results={testResults} />
        </div>
      )}
    </>
  );
}

function Inputs({ variab, setVar }) {
  return (
    <input
      className="inputBox"
      type="text"
      value={variab}
      onChange={(e) => setVar(e.target.value)}
    />
  );
}

function SelectBar({ d, setD }) {
  return (
    <select
      className="inputBox"
      value={d}
      onChange={(e) => setD(Number(e.target.value))}
    >
      <option value="1">0.1</option>
      <option value="2">0.01</option>
      <option value="3">0.001</option>
    </select>
  );
}
