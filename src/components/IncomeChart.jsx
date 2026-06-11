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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function IncomeChart() {

  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    fetchIncomeData();
  }, []);

  const fetchIncomeData = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/analytics/income"
      );

      const filteredData =
        response.data.filter(
          (item) => item.income !== null
        );

      setIncomeData(filteredData);

    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    labels: incomeData.map(
      (item) => item.income
    ),

    datasets: [
      {
        label: "Customers",

        data: incomeData.map(
          (item) => item.count
        ),

        backgroundColor: "#0f4c81",
        borderRadius: 8
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <h3>Income Distribution</h3>

      <div
        style={{
          width: "100%",
          height: "300px"
        }}
      >
        <Bar
          data={data}
          options={options}
        />
      </div>
    </>
  );
}

export default IncomeChart;