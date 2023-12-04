"use client";

import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";

export default function MonthsChart({
  data,
}: {
  data: Record<string, number>;
}) {
  const arr = Object.entries(data).map(([key, value]) => ({
    name: key,
    uv: value === 0 ? 0.1 : value,
  }));

  return (
    <ResponsiveContainer width="100%" height="70%">
      <BarChart width={150} height={40} data={arr}>
        <Bar dataKey="uv" fill="#22c55e" />
        <XAxis dataKey="name" />
      </BarChart>
    </ResponsiveContainer>
  );
}
