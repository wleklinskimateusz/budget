"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TypesChartProps = {
  data: { name: string; ideal: number; real: number }[];
};

export const TypesChart = ({ data }: TypesChartProps) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
      width={200}
      height={200}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="ideal" fill="#8884d8" />
      <Bar dataKey="real" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
);
