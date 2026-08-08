import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

function BarChartCard({ data }) {

  const chart = [
    {
      name: "Without AI",
      value: data?.holdout?.without_ai || 0,
      color: "#ef4444",
    },
    {
      name: "With AI",
      value: data?.holdout?.with_ai || 0,
      color: "#22c55e",
    },
    {
      name: "Improvement",
      value: data?.holdout?.improvement || 0,
      color: "#2563eb",
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
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        🤖 AI Holdout Validation
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chart}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="value" radius={[8, 8, 0, 0]}>

            {chart.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
              />
            ))}

          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartCard;