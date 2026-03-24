import { useState } from "react";
import API from "../api";
import "../styles.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const submit = async () => {
    try {
      if (isLogin) {
        const res = await API.post("/auth/login", data);
        localStorage.setItem("userId", res.data._id);
        window.location.href = "/home";
      } else {
        await API.post("/auth/register", data);
        alert("Account Created ✅");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h1 className="brand">SmartTech</h1>
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <input placeholder="Username"
          onChange={e => setData({...data, username:e.target.value})}
        />

        {!isLogin && (
          <input placeholder="Email"
            onChange={e => setData({...data, email:e.target.value})}
          />
        )}

        <input type="password" placeholder="Password"
          onChange={e => setData({...data, password:e.target.value})}
        />

        <button onClick={submit}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} className="toggle">
          {isLogin ? "New user? Register" : "Already have account? Login"}
        </p>
      </div>
    </div>
  );
}