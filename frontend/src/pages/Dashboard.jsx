import { useEffect, useState } from "react";
import api from "../services/api";
import Payment from "../components/Payment";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import PredictionForm from "../components/PredictionForm";
import PieChartCard from "../components/PieChartCard";
import BarChartCard from "../components/BarChartCard";
import Footer from "../components/Footer";

import {
  FaShoppingCart,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartLine,
} from "react-icons/fa";

function Dashboard() {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => {
        console.log("Dashboard Data:", res.data);
        setDashboard(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "30px",
          color: "#2563eb",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "30px 60px",
          background: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            color: "#1e293b",
          }}
        >
          🛒 Cart Rescue AI Dashboard
        </h1>

        {/* KPI Cards */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          <StatCard
            title="Sessions"
            value={dashboard.total_sessions}
            color="#2563eb"
            icon={<FaShoppingCart />}
          />

          <StatCard
            title="Purchases"
            value={dashboard.successful_purchases}
            color="#22c55e"
            icon={<FaCheckCircle />}
          />

          <StatCard
            title="Abandoned"
            value={dashboard.abandoned_carts}
            color="#ef4444"
            icon={<FaExclamationTriangle />}
          />

          <StatCard
            title="Recovery %"
            value={`${dashboard.recovery_rate}%`}
            color="#f59e0b"
            icon={<FaChartLine />}
          />
        </div>

        {/* Prediction */}

        <PredictionForm />
        <Payment />
        {/* Charts */}

        <div
          style={{
            display: "flex",
            gap: "30px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          <PieChartCard data={dashboard} />

          <BarChartCard data={dashboard} />
        </div>

        <div style={{ marginTop: "50px" }}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Dashboard;