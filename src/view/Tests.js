export const Tests = ({ results }) => (
  <div className="results">
    <table className="table">
      <tbody>
        <tr className="tr">
          <th>Lp</th>
          <th>N</th>
          <th>pK</th>
          <th>pM</th>
          <th>T</th>
          <th>średnie f(x)</th>
          {/* <th>max f(x)</th> */}
        </tr>
        {results.map(({ lp, n, t, pk, pm, avgfX, maxFx }) => (
          <tr key={lp}>
            <td>{lp}</td>
            <td>{n}</td>
            <td>{pk}</td>
            <td>{pm}</td>
            <td>{t}</td>
            <td>{avgfX}</td>
            {/* <td>{maxFx}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
