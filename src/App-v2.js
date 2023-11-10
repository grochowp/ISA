import { useState } from "react";
import {
  LpToFx,
  FxToGx,
  PcToKids,
  KidsToFX,
  rToPc,
  GxToR,
} from "./functions-v2";
import { Table } from "./Table";
import { TableAfter } from "./TableAfter";
import { loopOverResults } from "./Data";

const Graph = ({ results }) => {
  return (
    <div className="results">
      <table className="table">aaaaaaaaaaaaa</table>
    </div>
  );
};

const Tests = ({ results }) => {
  return (
    <div className="results">
      <table className="table">bbbbbbbbbbbb</table>
    </div>
  );
};

export default function App() {
  const [a, setA] = useState(-4);
  const [b, setB] = useState(12);
  const [d, setD] = useState(1);
  const [n, setN] = useState(100);
  const [t, setT] = useState(50);
  const [pk, setPk] = useState(0.7);
  const [pm, setPm] = useState(0.01);
  const [minmax, setMinmax] = useState("min");
  const [results, setResults] = useState([]);

  const [resultsAfter, setResultsAfter] = useState([]);

  const [displayResults, setDisplayResults] = useState(false);
  const [displayGraph, setDisplayGraph] = useState(false);
  const [displayTests, setDisplayTests] = useState(false);
  const [displayData, setDisplayData] = useState(false);

  const dMultiplier = d === 1 ? 0.1 : d === 2 ? 0.01 : 0.001;
  const l = Math.ceil(Math.log2((b - a) / dMultiplier) + 1);

  function handleStart() {
    !displayResults && setDisplayResults(true);
    displayGraph && setDisplayGraph(false);
    displayTests && setDisplayTests(false);

    const tempFx = LpToFx(a, b, d, n, l);
    const tempGx = FxToGx(tempFx, dMultiplier, minmax);
    const tempParents = GxToR(tempGx);
    const tempSelected = rToPc(tempParents, a, b, l, pk, n);
    const tempKids = PcToKids(tempSelected, l);
    const newResults = KidsToFX(tempKids, pm, a, b, l, d);
    setResults(newResults);

    // const newResultsAfter = loopOverResults(newResults, t);
    // setResultsAfter(newResultsAfter);
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

  function handleTests() {
    !displayTests && setDisplayTests(true);
    displayGraph && setDisplayGraph(false);
    displayResults && setDisplayResults(false);
    displayData && setDisplayData(false);
  }
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
        {/* <span>
          min/max =
          <select
            className="inputBox"
            value={minmax}
            onChange={(e) => setMinmax(e.target.value)}
          >
            <option value="min">min</option>
            <option value="max">max</option>
          </select>
        </span> */}
        <span>
          pK = <Inputs variab={pk} setVar={setPk} />
        </span>
        <span>
          pM = <Inputs variab={pm} setVar={setPm} />
        </span>
        <span>
          <button onClick={handleStart}>START</button>
        </span>
      </div>
      <div className="choose">
        <span>
          <button onClick={handleStarter}>TABELKA</button>
        </span>
        <span>
          <button onClick={handleData}>DANE</button>
        </span>
        <span>
          <button onClick={handleGraph}>WYKRES</button>
        </span>
        <span>
          <button onClick={handleTests}>TESTY</button>
        </span>
      </div>

      {displayResults && (
        <div>
          <br />
          <Table results={results} />
        </div>
      )}

      {displayData && (
        <div>
          <br />
          <TableAfter results={resultsAfter} />
        </div>
      )}

      {displayGraph && (
        <div>
          <br />
          <Graph results={results} />
        </div>
      )}

      {displayTests && (
        <div>
          <br />
          <Tests results={results} />
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
