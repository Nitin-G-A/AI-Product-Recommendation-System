import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function GenderChart({ maleCustomers, femaleCustomers }) {
  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [maleCustomers, femaleCustomers],
        backgroundColor: ["#2563eb", "#06b6d4"],
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgba(255,255,255,0.6)",
          padding: 20,
          font: { size: 13, family: "'Inter', sans-serif" },
          boxWidth: 12,
          boxHeight: 12,
          borderRadius: 6,
        },
      },
      tooltip: {
        backgroundColor: "rgba(10,22,40,0.95)",
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
        titleColor: "#fff",
        bodyColor: "rgba(255,255,255,0.6)",
        padding: 12,
        cornerRadius: 10,
      },
    },
  };

  return (
    <>
      <h3>Gender Distribution</h3>
      <div style={{ width: "100%", maxWidth: "300px", height: "260px", margin: "0 auto" }}>
        <Pie data={data} options={options} />
      </div>
    </>
  );
}

export default GenderChart;