import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function GenderChart({
  maleCustomers,
  femaleCustomers
}) {

  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [
          maleCustomers,
          femaleCustomers
        ],
        backgroundColor: [
          "#0f4c81",
          "#40e0d0"
        ],
        borderColor: "#ffffff",
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top"
      }
    }
  };

  return (
    <>
      <h3>Gender Distribution</h3>

      <div
        style={{
          width: "100%",
          maxWidth: "320px",
          height: "280px",
          margin: "0 auto"
        }}
      >
        <Pie
          data={data}
          options={options}
        />
      </div>
    </>
  );
}

export default GenderChart;