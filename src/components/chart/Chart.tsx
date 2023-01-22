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
  "#361495",
  "#7518A1",
  "#017EFA",
  "#0B3B82",
  "#6D3277",
  "#f23384",
  "#002147",
  "#551a8b",
  "#003366",
  "#f5f5dc",
  "#c71585",
  "#702963",
];
const style = {
  top: "4vh",
  right: "0vw",
  lineHeight: "34px",
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
          outerRadius={130}
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
