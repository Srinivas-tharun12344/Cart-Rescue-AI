import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

function PieChartCard({ data }) {

  console.log("Pie Data:", data);

  const chartData = [
    {
      name: "Purchased",
      value: data?.successful_purchases || 0,
    },
    {
      name: "Abandoned",
      value: data?.abandoned_carts || 0,
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
        Purchase Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartCard;