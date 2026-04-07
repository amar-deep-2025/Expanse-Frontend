import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function BarChartComponent({ data }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Monthly Expenses
        </h2>
        <span className="text-sm text-gray-400">Overview</span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

          {/* Axis */}
          <XAxis dataKey="month" />
          <YAxis />

          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Bars */}
          <Bar
            dataKey="expense"
            fill="#3b82f6"
            radius={[10, 10, 0, 0]} // rounded top
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// 🔥 Tooltip
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-3 rounded shadow text-sm">
        <p className="font-semibold">{label}</p>
        <p>Expense: ₹{payload[0].value}</p>
      </div>
    );
  }
  return null;
}
