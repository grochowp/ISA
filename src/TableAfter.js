export const TableAfter = ({ results }) => (
  <div className="results">
    <table className="table">
      <tbody>
        <tr className="tr">
          <th>Lp</th>
          <th>xReal</th>
          <th>f(x)</th>
          <th>xBin</th>
          <th>%</th>
        </tr>
        {results.map(({ lp, xReal, fX, xBin, percentage }) => (
          <tr key={lp}>
            <td>{lp}</td>
            <td>{xReal}</td>
            <td>{fX}</td>
            <td>{xBin}</td>
            <td>{percentage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
