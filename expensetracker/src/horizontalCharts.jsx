import React from "react";
import {
  ComposedChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";



export default function BarChart({ chartList }) {

  const data = chartList.map(expense => ({
    name: expense.category,
    value: Number(expense.price),
  }));
  if (data.length > 0) {
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
    )
  }
  return (
    <div style={ { position: "relative", width: "100%", height: 400 } }>
      <ResponsiveContainer>
        <ComposedChart
          layout="vertical"
          width={ 500 }
          height={ 400 }
          data={ [{ name: " ", value: 0 }] } // dummy data
          margin={ { top: 20, right: 20, bottom: 20, left: 20 } }
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={ [0, 1] } />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Overlay message */ }
      <div
        style={ {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1.2rem",
          color: "#666",
        } }
      >
        No Data Available
      </div>
    </div>
  );
}
