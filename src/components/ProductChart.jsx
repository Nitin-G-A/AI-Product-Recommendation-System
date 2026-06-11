import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ProductChart() {

  const [productData, setProductData] =
    useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/analytics/products"
      );

      const filteredData =
        response.data.filter(
          (item) =>
            item.recommended_product !== null
        );

      setProductData(filteredData);

    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    labels: productData.map(
      (item) => item.recommended_product
    ),

    datasets: [
      {
        data: productData.map(
          (item) => item.count
        ),

        backgroundColor: [
          "#0f4c81",
          "#40e0d0",
          "#ffd700",
          "#ff6b6b",
          "#6c5ce7"
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
      <h3>
        Product Recommendations
      </h3>

      <div
        style={{
          width: "100%",
          maxWidth: "320px",
          height: "280px",
          margin: "0 auto"
        }}
      >
        <Doughnut
          data={data}
          options={options}
        />
      </div>
    </>
  );
}

export default ProductChart;