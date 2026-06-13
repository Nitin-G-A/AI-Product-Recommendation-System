import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function IncomeChart() {
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => { fetchIncomeData(); }, []);

  const fetchIncomeData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/analytics/income");
      setIncomeData(response.data.filter((item) => item.income !== null));
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    labels: incomeData.map((item) => item.income),
    datasets: [
      {
        label: "Customers",
        data: incomeData.map((item) => item.count),
        backgroundColor: "rgba(37,99,235,0.75)",
        borderColor: "#06b6d4",
        borderWidth: 1.5,
        borderRadius: 10,
        borderSkipped: false,
        hoverBackgroundColor: "#06b6d4",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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
    scales: {
      x: {
        ticks: {
          color: "rgba(255,255,255,0.4)",
          font: { size: 11, family: "'Inter', sans-serif" },
          maxRotation: 30,
        },
        grid: { color: "rgba(255,255,255,0.04)" },
        border: { color: "rgba(255,255,255,0.06)" },
      },
      y: {
        ticks: { color: "rgba(255,255,255,0.4)", font: { size: 11 } },
        grid: { color: "rgba(255,255,255,0.04)" },
        border: { color: "rgba(255,255,255,0.06)" },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <h3>Income Distribution</h3>
      <div style={{ width: "100%", height: "280px" }}>
        <Bar data={data} options={options} />
      </div>
    </>
  );
}

export default IncomeChart;