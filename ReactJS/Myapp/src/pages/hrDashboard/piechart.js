import React from "react"
import { Pie } from "react-chartjs-2"

const PieChart = () => {
  const data = {
    // Headers:["TOtal Employee"],
    labels: ["Active Employee", "Inactive Employee"],
    datasets: [
      {
        data: [20, 0],
        backgroundColor: ["#34c38f", "#d3d7d9"],
        hoverBackgroundColor: ["#34c38f", "#ebeff2"],
        hoverBorderColor: "#fff",
      
      },
    ],
  }

  return (
    <div>
   
      <Pie width={460} height={360} data={data} />
    </div>
  )
}

export default PieChart
