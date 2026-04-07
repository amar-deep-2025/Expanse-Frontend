import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

export default function PieChartComponent({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Category Breakdown
        </h2>
        <span className="text-sm text-gray-400">Expenses</span>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              innerRadius={60}
              paddingAngle={3}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* 🔥 Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-gray-400 text-sm">Total</p>
          <h2 className="text-xl font-bold text-gray-800">₹{total}</h2>
        </div>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const d = payload[0];
    return (
      <div className="bg-gray-800 text-white px-3 py-2 rounded text-sm shadow">
        <p className="font-semibold">{d.name}</p>
        <p>₹ {d.value}</p>
      </div>
    );
  }
  return null;
}
