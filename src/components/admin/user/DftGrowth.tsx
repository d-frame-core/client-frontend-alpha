import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Month A",
    Male: 4000,
    Female: 2400,
    IDK: 2400
  },
  {
    name: "Month B",
    Male: 3000,
    Female: 1398,
    IDK: 2210
  },
  {
    name: "Month C",
    Male: 2000,
    Female: 9800,
    IDK: 2290
  },
  {
    name: "Month D",
    Male: 2780,
    Female: 3908,
    IDK: 2000
  },
  {
    name: "Month E",
    Male: 1890,
    Female: 4800,
    IDK: 2181
  },
  {
    name: "Month F",
    Male: 2390,
    Female: 3800,
    IDK: 2500
  },
  {
    name: "Month G",
    Male: 3490,
    Female: 4300,
    IDK: 2100
  }
];

export default function DftGrowth() {
  return (
    <LineChart
      width={1200}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Female"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="Male" stroke="#82ca9d" />
    </LineChart>
  );
}
