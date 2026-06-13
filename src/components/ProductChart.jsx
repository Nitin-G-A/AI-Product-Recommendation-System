import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ProductChart() {
  const [productData, setProductData] = useState([]);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/analytics/products");
      setProductData(response.data.filter((item) => item.recommended_product !== null));
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    labels: productData.map((item) => item.recommended_product),
    datasets: [
      {
        data: productData.map((item) => item.count),
        backgroundColor: ["#2563eb", "#06b6d4", "#f59e0b", "#8b5cf6", "#10b981"],
        borderColor: "rgba(255,255,255,0.06)",
        borderWidth: 3,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "62%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgba(255,255,255,0.6)",
          padding: 18,
          font: { size: 12, family: "'Inter', sans-serif" },
          boxWidth: 12,
          boxHeight: 12,
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
      <h3>Product Recommendations</h3>
      <div style={{ width: "100%", maxWidth: "300px", height: "280px", margin: "0 auto" }}>
        <Doughnut data={data} options={options} />
      </div>
    </>
  );
}

export default ProductChart;