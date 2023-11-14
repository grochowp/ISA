export const Table = ({ results }) => {
  return (
    <div className="results">
      <table className="table">
        <tbody>
          <tr className="tr">
            <th>Lp</th>
            <th>xReal</th>
            <th>f(x)</th>
            {/* <th>g(x)</th>
            <th>Pi</th> */}
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
              xReal,
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
                <td>{xReal}</td>
                <td>{fX}</td>
                {/* <td>{gX}</td>
                <td>{Pi}</td> */}
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
};
