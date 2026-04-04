import { useState } from "react";

export default function AuthModal({ close }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close" onClick={close}>
          X
        </button>
        <div className="tabs">
          <button onClick={() => setIsLogin(true)}>Login</button>
          <button onClick={() => setIsLogin(false)}>Register</button>
        </div>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <>
      <h2>Login</h2>
      <input className="input" placeholder="Email" />
      <input className="input" type="password" placeholder="Password" />
      <button className="submit">Login</button>
    </>
  );
}

function RegisterForm() {
  return (
    <div>
      <h2>Register</h2>
      <input className="input" placeholder="Name" />
      <input className="input" placeholder="Email" />
      <input className="input" placeholder="password" />
      <button className="submit">Register</button>
    </div>
  );
}
