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
import "./chart.css";
const COLORS = [
  "#7518A1",
  "#913BF2",
  "#017EFA",
  "#E25959",
  "#0B3B82",
  "#39CEF3",
  "#c71585",
  "#003366",
  "#f5f5dc",
  "#551a8b",
];
const style = {
  top: -290,
  left: "83%",
  lineHeight: "15px",
  borderRadius: "10px",
  background: "white",
  padding: `10px`,
  width: "45%",
  boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
  position: "relative" as "relative",
};
const RADIAN = Math.PI / 180;

export default function Chart(indata: any[], value: string) {
  return (
    <Container maxWidth={false}>
      <PieChart width={450} height={290}>
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
          payload={indata.map((item, index) => ({
            id: item.name,
            type: "circle",
            value: (
              <div className="legend">
                {item.name} : {item.per}%
              </div>
              // <table className="table">
              //   <tr>
              //     <td>{item.name}</td>
              //     <td>:</td>
              //     <td>{item.per}%</td>
              //   </tr>
              // </table>
            ),
            color: COLORS[index % COLORS.length],
          }))}
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
        />
        {/* <div className="legendBox">
          {indata.map((item, index) => {
            return (
              <div className="legend">
                {item.name} : {item.per}%
              </div>
            );
          })}
        </div> */}
        <Tooltip />
      </PieChart>
    </Container>
  );
}
