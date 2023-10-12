import { useState } from "react";
import {
  BinToInt,
  CreateXReal1,
  IntToBin,
  RealToInt,
  IntToReal,
} from "./functions";

const Table = ({ results }) => (
  <div className="results">
    <table className="table">
      <tbody>
        <tr className="tr">
          <th>Lp</th>
          <th>xReal</th>
          <th>xInt</th>
          <th>xBin</th>
          <th>xInt</th>
          <th>xReal</th>
          <th>f(x)</th>
        </tr>
        {results.map(({ lp, xReal1, xInt1, xBin, xInt2, xReal2, fX }) => (
          <tr key={lp}>
            <td>{lp}</td>
            <td>{xReal1}</td>
            <td>{xInt1}</td>
            <td>{xBin}</td>
            <td>{xInt2}</td>
            <td>{xReal2}</td>
            <td>{fX}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Results = [];

export default function App() {
  const [a, setA] = useState(-4);
  const [b, setB] = useState(12);
  const [d, setD] = useState(1);
  const [n, setN] = useState(10);
  const dMultiplier = d === 1 ? 0.1 : d === 2 ? 0.01 : 0.001;
  const l = Math.ceil(Math.log2((b - a) / dMultiplier) + 1);
  console.log(l);
  const [displayResults, setDisplayResults] = useState(false);
  const [results, setResults] = useState(Results);

  function handleStart() {
    setDisplayResults((display) => !display);

    let newResults = [];

    for (let i = 0; i < n; i++) {
      const xReal1 = CreateXReal1(Number(a), Number(b), d);
      const xInt1 = RealToInt(Number(a), Number(b), xReal1, l, d);
      const xBin = IntToBin(xInt1);
      const xInt2 = BinToInt(xBin);
      const xReal2 = IntToReal(Number(a), Number(b), xInt2, l, d);

      const newResult = {
        lp: i + 1,
        xReal1,
        xInt1,
        xBin,
        xInt2: xInt1,
        xReal2,

        fX: `f(x${i + 1})`,
      };
      newResults.push(newResult);
    }

    setResults(newResults);
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
          <button onClick={handleStart}>
            {displayResults ? "Stop" : "Start"}
          </button>
        </span>
      </div>

      {displayResults && (
        <div>
          <br />
          <Table results={results} />
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
