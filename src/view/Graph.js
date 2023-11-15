import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
} from "recharts";

export const Graph = ({ dataGraph }) => {
  console.log(dataGraph);

  const yValues = dataGraph.reduce(
    (acc, dataPoint) => acc.concat(dataPoint.max, dataPoint.mid, dataPoint.min),
    []
  );
  const minY = Math.floor(Math.min(...yValues));
  const maxY = Math.ceil(Math.max(...yValues));

  return (
    <div className="results">
      <LineChart
        width={600}
        height={400}
        data={dataGraph}
        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis yAxisId={1} domain={[minY, maxY]} />

        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="max" stroke="#387908" yAxisId={1} />
        <Line type="monotone" dataKey="mid" stroke="#e21000" yAxisId={1} />
        <Line type="monotone" dataKey="min" stroke="#ff7300" yAxisId={1} />
      </LineChart>
    </div>
  );
};
