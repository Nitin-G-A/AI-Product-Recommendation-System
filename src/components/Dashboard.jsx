import { useEffect, useState } from "react";
import axios from "axios";
import GenderChart from "./GenderChart";
import IncomeChart from "./IncomeChart";
import ProductChart from "./ProductChart";

function Dashboard() {
  const [totalCustomers,  setTotalCustomers]  = useState(0);
  const [maleCustomers,   setMaleCustomers]   = useState(0);
  const [femaleCustomers, setFemaleCustomers] = useState(0);

  useEffect(() => { fetchAnalytics(); }, []);

  const fetchAnalytics = async () => {
    try {
      const totalRes  = await axios.get("http://localhost:5000/api/analytics/total-customers");
      setTotalCustomers(totalRes.data.total_customers);

      const genderRes = await axios.get("http://localhost:5000/api/analytics/gender");
      let male = 0, female = 0;
      genderRes.data.forEach((item) => {
        if (item.gender === "Male")   male   = item.count;
        if (item.gender === "Female") female = item.count;
      });
      setMaleCustomers(male);
      setFemaleCustomers(female);
    } catch (err) {
      console.error("Analytics fetch failed", err);
    }
  };

  const cards = [
    { label: "Total Customers", value: totalCustomers },
    { label: "Male Customers",  value: maleCustomers  },
    { label: "Female Customers",value: femaleCustomers },
  ];

  return (
    <div className="dashboard-section">
      <h2>📊 Analytics Dashboard</h2>

      <div className="dashboard-cards">
        {cards.map((c) => (
          <div className="dashboard-card" key={c.label}>
            <h3>{c.label}</h3>
            <p>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <GenderChart maleCustomers={maleCustomers} femaleCustomers={femaleCustomers} />
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