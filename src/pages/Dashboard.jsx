import { useEffect, useState } from "react";
import { getSummary, getMonthly, getRecent } from "../services/api";

import LineChartComponent from "../components/charts/LineChart";
import BarChartComponent from "../components/charts/BarChart";
import PieChartComponent from "../components/charts/PieChart";

export default function Dashboard() {
  const [summary, setSummary] = useState({});
  const [monthly, setMonthly] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const year = new Date().getFullYear();

      const [sum, mon, rec] = await Promise.all([
        getSummary(),
        getMonthly(year),
        getRecent(),
      ]);

      setSummary(sum.data || {});
      setMonthly(mon.data || []);
      setRecent(rec.data || []);
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  // ✅ Data transform (IMPORTANT)
  const formattedMonthly = monthly.map((m) => ({
    month: `M${m.month}`,
    income: m.income,
    expense: m.expense,
  }));

  const categoryData = recent.reduce((acc, curr) => {
    if (curr.type !== "EXPENSE") return acc;
    const name = curr.category?.name || "Other";

    const existing = acc.find((i) => i.name === name);

    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({ name, value: curr.amount });
    }

    return acc;
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* 🔝 Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Track your expenses smartly 💸</p>
      </div>

      {/* 💰 Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card
          title="Income"
          amount={summary.totalIncome || 0}
          color="from-green-400 to-green-600"
        />
        <Card
          title="Expense"
          amount={summary.totalExpense || 0}
          color="from-red-400 to-red-600"
        />
        <Card
          title="Balance"
          amount={summary.balance || 0}
          color="from-blue-400 to-blue-600"
        />
      </div>

      {/* 📈 Line Chart */}
      {formattedMonthly.length > 0 && (
        <LineChartComponent data={formattedMonthly} />
      )}

      {/* 📊 Pie + Bar */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {categoryData.length > 0 && <PieChartComponent data={categoryData} />}

        {formattedMonthly.length > 0 && (
          <BarChartComponent data={formattedMonthly} />
        )}
      </div>

      {/* 🧾 Recent Transactions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

        {recent.length === 0 ? (
          <p className="text-gray-400 text-center">No transactions found</p>
        ) : (
          <div className="space-y-3">
            {recent.map((r) => (
              <div
                key={r.id}
                className="flex justify-between items-center p-4 rounded-xl border hover:shadow-md hover:bg-gray-50 transition duration-200"
              >
                {/* Left */}
                <div className="flex items-center gap-3">
                  <CategoryIcon category={r.category?.name} />

                  <div>
                    <p className="font-medium text-gray-800">{r.title}</p>
                    <p className="text-sm text-gray-400">
                      {r.category?.name || "Other"}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="text-right">
                  <p
                    className={`font-semibold text-lg ${
                      r.type === "EXPENSE" ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    ₹{r.amount || 0}
                  </p>

                  <p className="text-xs text-gray-400">
                    {r.date ? new Date(r.date).toLocaleDateString() : "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 💰 Card Component
function Card({ title, amount, color }) {
  return (
    <div
      className={`bg-gradient-to-r ${color} text-white p-6 rounded-2xl shadow-lg 
      hover:scale-105 hover:shadow-2xl transition duration-300`}
    >
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-2xl font-bold mt-2">₹{amount}</h2>
    </div>
  );
}

// 🎯 Category Icon
function CategoryIcon({ category }) {
  const base =
    "w-10 h-10 flex items-center justify-center rounded-full text-white";

  switch (category) {
    case "FOOD":
      return <div className={`${base} bg-orange-400`}>🍔</div>;
    case "SALARY":
      return <div className={`${base} bg-green-500`}>💼</div>;
    case "BILLS":
      return <div className={`${base} bg-blue-500`}>💡</div>;
    default:
      return <div className={`${base} bg-gray-400`}>💸</div>;
  }
}
