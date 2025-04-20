import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

export default function Charts({ expenseList }) {

  console.log(expenseList)
  // Prepare data for the chart
  const data = expenseList.map(expense => ({
    name: expense.category,
    value: Number(expense.price),
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend layout="vertical" verticalAlign="bottom" align="right" height={200} iconSize={10} />
    </PieChart>
  );
}
