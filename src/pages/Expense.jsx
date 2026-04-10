import { useEffect, useState } from "react";
import { getExpenses, createExpense, deleteExpense } from "../services/api";

export default function Expense() {
  const [expenses, setExpenses] = useState([]);

  const [form, setForm] = useState({
    name: "",
    type: "EXPENSE",
    amount: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.amount || !form.category) {
      alert("All fields are required");
      return;
    }

    try {
      const payload = {
        name: form.name,
        type: form.type,
        amount: Number(form.amount),
        category: form.category,
        description: form.description,
      };

      await createExpense(payload);

      alert("Expense Added ✅");

      setForm({
        name: "",
        type: "EXPENSE",
        amount: "",
        category: "",
        description: "",
      });

      loadExpenses();
    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    await deleteExpense(id);
    loadExpenses();
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* PAGE HEADER */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Expense Manager 💸</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* ================= FORM ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add Expense
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAME */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Title (e.g. Salary, Food)"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {/* TYPE */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, type: "EXPENSE" })}
                className={`flex-1 py-2 rounded-lg ${
                  form.type === "EXPENSE"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                Expense
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, type: "INCOME" })}
                className={`flex-1 py-2 rounded-lg ${
                  form.type === "INCOME"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                Income
              </button>
            </div>

            {/* AMOUNT */}
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount ₹"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {/* CATEGORY */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Category</option>
              <option value="Salary">Salary</option>
              <option value="Food">Food</option>
              <option value="Bills">Bills</option>
              <option value="Shopping">Shopping</option>
              <option value="Travel">Travel</option>
              <option value="Furniture">Furniture</option>
              <option value="Stationary">Stationary</option>
              <option value="Other">Other</option>
            </select>

            {/* DESCRIPTION */}
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description (optional)"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {/* SUBMIT */}
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Add Expense
            </button>
          </form>
        </div>

        {/* ================= LIST ================= */}
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <p className="text-gray-500 text-center">No expenses found</p>
          ) : (
            expenses.map((e) => (
              <div
                key={e.id}
                className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">{e.name}</p>

                  <p className="text-sm text-gray-400">{e.category?.name}</p>

                  <p
                    className={`text-lg font-bold ${
                      e.type === "EXPENSE" ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    ₹{e.amount}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(e.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
