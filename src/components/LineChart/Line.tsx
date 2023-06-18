import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { x: 1, blue: 5, red: 7 },
  { x: 2, blue: 3, red: 9 },
  { x: 3, blue: 6, red: 5 },
  { x: 4, blue: 4, red: 8 },
  { x: 5, blue: 7, red: 6 },
  { x: 1, blue: 5, red: 7 },
  { x: 2, blue: 3, red: 9 },
  { x: 3, blue: 6, red: 5 },
  { x: 4, blue: 4, red: 8 },
  { x: 5, blue: 7, red: 6 },
  { x: 1, blue: 5, red: 7 },
  { x: 2, blue: 3, red: 9 },
  { x: 3, blue: 6, red: 5 },
  { x: 4, blue: 4, red: 8 },
  { x: 5, blue: 7, red: 6 },
  { x: 1, blue: 5, red: 7 },
  { x: 2, blue: 3, red: 9 },
  { x: 3, blue: 6, red: 5 },
  { x: 4, blue: 4, red: 8 },
  { x: 5, blue: 7, red: 6 },
];

const MyLineChart = () => {
  return (
    <LineChart
      width={800}
      height={200}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="x" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="blue" stroke="blue" />
      <Line type="monotone" dataKey="red" stroke="red" />
    </LineChart>
  );
};

export default MyLineChart;
