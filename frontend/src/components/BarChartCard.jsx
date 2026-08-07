import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function BarChartCard({ data }) {

  const chart = [
    {
      name: "High",
      value: data?.high_risk || 0,
    },
    {
      name: "Medium",
      value: data?.medium_risk || 0,
    },
    {
      name: "Low",
      value: data?.low_risk || 0,
    },
  ];

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        width: "48%",
        minWidth: "420px",
        height: "420px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        Risk Levels
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartCard;