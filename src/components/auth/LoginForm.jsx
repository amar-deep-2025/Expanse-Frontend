import { useState } from "react";
import { loginUser } from "../../services/api";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginForm = async () => {
    try {
      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.token);

      alert("Login Success ✅");
      navigate("/dashboard");
    } catch {
      alert("Login Failed ❌");
    }
  };

  return (
    <form>
      <div className="form-container">
        <h2>Login</h2>

        <input
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button className="submit" onClick={handleLoginForm}>
          Login
        </button>
      </div>
    </form>
  );
}
