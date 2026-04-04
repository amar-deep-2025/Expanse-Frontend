import { useState } from "react";

import LoginForm from "../auth/LoginForm";

import RegisterForm from "../auth/RegisterForm";

export default function AuthModal({ close }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close" onClick={close}>
          X
        </button>
        <div className="tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => {
              console.log("Login Clicked");
              setIsLogin(true);
            }}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => {
              console.log("Register clicked");
              setIsLogin(false);
            }}
          >
            Register
          </button>
        </div>
        <div className="form-container">
          {isLogin ? (
            <LoginForm />
          ) : (
            <RegisterForm
              closeModal={close}
              switchToLogin={() => setIsLogin(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
