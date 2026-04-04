import { useState } from "react";
import { registerUser } from "../../services/api";

export default function RegisterForm({ closeModal, switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // 🔥 prevent reload

    // ✅ Validation
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!form.email.trim()) {
      alert("Email is required");
      return;
    }

    if (!form.password.trim()) {
      alert("Password is required");
      return;
    }

    if (!form.phone.trim()) {
      alert("Phone is required");
      return;
    }

    // ✅ Phone format validation (10 digit)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      alert("Enter valid 10 digit phone number");
      return;
    }

    try {
      setLoading(true);

      await registerUser(form);

      alert("Registered Successfully ✅");

      switchToLogin();

      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
      });
    } catch (err) {
      alert("Registration Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="form-container">
        <h2>Register</h2>

        <input
          className="input"
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          className="input"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="input"
          name="password"
          type="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
        />

        <input
          className="input"
          name="phone"
          value={form.phone}
          placeholder="Phone"
          onChange={handleChange}
        />

        <button className="submit" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  );
}
