import React from "react";
import { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { stripBasename } from "@remix-run/router";
import { Container } from "@mui/material";

const COLORS = [
  "#913BF2",
  "#E25959",
  "#FFD80D",
  "#f23384",
  "#551a8b",
  "#7518A1",
  "#017EFA",
  "#0B3B82",

  "#39CEF3",

  "#003366",
  "#f5f5dc",
  "#c71585",
];
const style = {
  top: -300,
  left: "85%",
  lineHeight: "30px",
  borderRadius: "10px",
  background: "white",
  padding: `10px`,
  width: "30%",
  boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
  position: "relative" as "relative",
};
const RADIAN = Math.PI / 180;

export default function Chart(indata: any[], value: string) {
  return (
    <Container maxWidth={false} className="pie">
      <PieChart width={500} height={290}>
        <Pie
          dataKey={value}
          labelLine={false}
          isAnimationActive={true}
          data={indata}
          cx="50%"
          innerRadius={70}
          outerRadius={140}
        >
          {indata.map((entry, index) => (
            <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
        />

        <Tooltip />
      </PieChart>
    </Container>
  );
}
