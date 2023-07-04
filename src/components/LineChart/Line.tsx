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
  { x: 1, views: 5, users: 7 },
  { x: 2, views: 3, users: 9 },
  { x: 3, views: 6, users: 5 },
  { x: 4, views: 4, users: 8 },
  { x: 5, views: 7, users: 6 },
  { x: 1, views: 5, users: 7 },
  { x: 2, views: 3, users: 9 },
  { x: 3, views: 6, users: 5 },
  { x: 4, views: 4, users: 8 },
  { x: 5, views: 7, users: 6 },
  { x: 1, views: 5, users: 7 },
  { x: 2, views: 3, users: 9 },
  { x: 3, views: 6, users: 5 },
  { x: 4, views: 4, users: 8 },
  { x: 5, views: 7, users: 6 },
  { x: 1, views: 5, users: 7 },
  { x: 2, views: 3, users: 9 },
  { x: 3, views: 6, users: 5 },
  { x: 4, views: 4, users: 8 },
  { x: 5, views: 7, users: 6 },
];

const MyLineChart = () => {
  return (
    <LineChart
      width={850}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="x" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="views" stroke="blue" />
      <Line type="monotone" dataKey="users" stroke="red" />
    </LineChart>
  );
};

export default MyLineChart;
