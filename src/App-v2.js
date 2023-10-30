import { useState } from "react";
import {
  LpToFx,
  FxToGx,
  PcToKids,
  KidsToFX,
  rToPc,
  GxToR,
} from "./functions-v2";

const Table = ({ results }) => (
  <div className="results">
    <table className="table">
      <tbody>
        <tr className="tr">
          <th>Lp</th>
          <th>xReal</th>
          <th>f(x)</th>
          <th>g(x)</th>
          <th>Pi</th>
          <th>Qi</th>
          <th>r</th>
          <th>xRealSelected</th>
          <th>xBin</th>
          <th>Rodzice</th>
          <th>Pc</th>
          <th>Dzieci</th>
          <th>Punkty mutacji</th>
          <th>Po mutacji</th>
          <th>Po Mutacji Real</th>
          <th>f(x)</th>
        </tr>
        {results.map(
          ({
            lp,
            xReal1,
            fX,
            gX,
            Pi,
            Qi,
            r,
            xRealSelected,
            xBin,
            parents,
            Pc,
            kids,
            pktMutacji,
            xBinPoMutacji,
            xRealPoMutacji,
            newFx,
          }) => (
            <tr key={lp}>
              <td>{lp}</td>
              <td>{xReal1}</td>
              <td>{fX}</td>
              <td>{gX}</td>
              <td>{Pi}</td>
              <td>{Qi}</td>
              <td>{r}</td>
              <td>{xRealSelected}</td>
              <td>{xBin}</td>
              <td>{parents}</td>
              <td>{Pc}</td>
              <td>{kids}</td>
              <td>{pktMutacji}</td>
              <td>{xBinPoMutacji}</td>
              <td>{xRealPoMutacji}</td>
              <td>{newFx}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
);

export default function App() {
  const [a, setA] = useState(-4);
  const [b, setB] = useState(12);
  const [d, setD] = useState(1);
  const [n, setN] = useState(10);
  const [pk, setPk] = useState(0.7);
  const [pm, setPm] = useState(0.01);
  const [minmax, setMinmax] = useState("min");
  const [displayResults, setDisplayResults] = useState(false);
  const [results, setResults] = useState([]);

  const dMultiplier = d === 1 ? 0.1 : d === 2 ? 0.01 : 0.001;
  const l = Math.ceil(Math.log2((b - a) / dMultiplier) + 1);

  function handleStart() {
    !displayResults && setDisplayResults(true);
    const tempFx = LpToFx(a, b, d, n, l);
    const tempGx = FxToGx(tempFx, dMultiplier, minmax);
    const tempParents = GxToR(tempGx);
    const tempSelected = rToPc(tempParents, a, b, l, pk);
    const tempKids = PcToKids(tempSelected, l);
    const newResults = KidsToFX(tempKids, pm, a, b, l, d);
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
          <button onClick={handleStart}>Start</button>
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
