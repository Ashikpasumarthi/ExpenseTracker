import React from "react";
import {
  ComposedChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,

  Tooltip,
  Legend,

} from "recharts";



export default function BarChart({ chartList }) {

  const data = chartList.map(expense => ({
    name: expense.category,
    value: Number(expense.price),
  }));
  if (data.length === 0) {
    return (


      <ResponsiveContainer >
        <ComposedChart className="recharts-wrapper-horizontal"
          layout="vertical"
          width={ 500 }
          height={ 400 }
          // data={ }
          margin={ {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          } }
        >

          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />


          <Bar dataKey="value" barSize={ 20 } fill="#413ea0" />
          <Legend />

        </ComposedChart>
      </ResponsiveContainer>
    )
  }
  return (
    <ResponsiveContainer >
      <ComposedChart className="recharts-wrapper-horizontal"
        layout="vertical"
        width={ 500 }
        height={ 400 }
        data={ data }
        margin={ {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        } }
      >

        <XAxis type="number" />
        <YAxis dataKey="name" type="category" scale="band" />
        <Tooltip />


        <Bar dataKey="value" barSize={ 20 } fill="#413ea0" />
        <Legend />

      </ComposedChart>
    </ResponsiveContainer>
  );
}
