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
        {results.map(({ lp, xReal1, fX, xBin, percentage }) => (
          <tr key={lp}>
            <td>{lp}</td>
            <td>{xReal1}</td>
            <td>{fX}</td>
            <td>{xBin}</td>
            <td>{percentage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
