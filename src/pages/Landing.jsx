import { useState } from "react";
import AuthModal from "../components/layout/AuthModal";
import ".././styles/global.css";

export default function Landing() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container">
      <h1 className="title">Track Your Expanses</h1>
      <p className="subtitle">Manage money smartly</p>

      <button className="btn" onClick={() => setOpen(true)}>
        Get Started
      </button>

      {open && <AuthModal close={() => setOpen(false)} />}
    </div>
  );
}
