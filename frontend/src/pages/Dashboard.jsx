import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import PredictionForm from "../components/PredictionForm";
import Payment from "../components/Payment";
import PieChartCard from "../components/PieChartCard";
import BarChartCard from "../components/BarChartCard";
import Footer from "../components/Footer";

import {
  FaShoppingCart,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

function Dashboard() {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      console.log("Dashboard:", res.data);
      setDashboard(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
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
            value={dashboard.total_sessions || 0}
            color="#2563eb"
            icon={<FaShoppingCart />}
          />

          <StatCard
            title="Purchases"
            value={dashboard.successful_purchases || 0}
            color="#22c55e"
            icon={<FaCheckCircle />}
          />

          <StatCard
            title="Abandoned"
            value={dashboard.abandoned_carts || 0}
            color="#ef4444"
            icon={<FaExclamationTriangle />}
          />

          <StatCard
            title="Recovery %"
            value={`${dashboard.recovery_rate || 0}%`}
            color="#f59e0b"
            icon={<FaChartLine />}
          />
        </div>

        {/* Prediction */}

        <PredictionForm />

        {/* Payment */}
        {/* Pass refresh function */}
        <Payment refreshDashboard={loadDashboard} />

        {/* Holdout Validation */}

        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          }}
        >
          <h2>
            <FaRobot color="#2563eb" /> AI Holdout Validation
          </h2>

          <hr />

          <h3>
            Recovery Without AI :
            <span style={{ color: "#ef4444" }}>
              {" "}
              {dashboard.holdout?.without_ai ?? 0}%
            </span>
          </h3>

          <h3>
            Recovery With AI :
            <span style={{ color: "#22c55e" }}>
              {" "}
              {dashboard.holdout?.with_ai ?? 0}%
            </span>
          </h3>

          <h2 style={{ color: "#2563eb" }}>
            Improvement : +{dashboard.holdout?.improvement ?? 0}%
          </h2>

          <p style={{ marginTop: "20px", lineHeight: "28px" }}>
            This compares a simulated control group (without AI recommendations)
            against an AI-assisted group. AI improves cart recovery through
            personalized interventions while reducing unnecessary discounts.
          </p>
        </div>

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