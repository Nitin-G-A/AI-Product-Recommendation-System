import { useEffect, useState } from "react";
import axios from "axios";
import GenderChart from "./GenderChart";
import IncomeChart from "./IncomeChart";
import ProductChart from "./ProductChart";

function Dashboard() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [maleCustomers, setMaleCustomers] = useState(0);
  const [femaleCustomers, setFemaleCustomers] = useState(0);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Total Customers
      const totalResponse = await axios.get(
        "http://localhost:5000/api/analytics/total-customers"
      );

      setTotalCustomers(
        totalResponse.data.total_customers
      );

      // Gender Analytics
      const genderResponse = await axios.get(
        "http://localhost:5000/api/analytics/gender"
      );

      let male = 0;
      let female = 0;

      genderResponse.data.forEach((item) => {
        if (item.gender === "Male") {
          male = item.count;
        }

        if (item.gender === "Female") {
          female = item.count;
        }
      });

      setMaleCustomers(male);
      setFemaleCustomers(female);

    } catch (error) {
      console.error(
        "Analytics Fetch Failed",
        error
      );
    }
  };

  return (
    <div className="dashboard-section">
      <h2>📊 Analytics Dashboard</h2>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Customers</h3>
          <p>{totalCustomers}</p>
        </div>

        <div className="dashboard-card">
          <h3>Male Customers</h3>
          <p>{maleCustomers}</p>
        </div>

        <div className="dashboard-card">
          <h3>Female Customers</h3>
          <p>{femaleCustomers}</p>
        </div>

      </div>
<div className="charts-grid">
  <div className="chart-card">
    <GenderChart
      maleCustomers={maleCustomers}
      femaleCustomers={femaleCustomers}
    />
  </div>

  <div className="chart-card">
    <IncomeChart />
  </div>
</div>

<div className="chart-card product-chart">
  <ProductChart />
</div>
    </div>

  );
}

export default Dashboard;