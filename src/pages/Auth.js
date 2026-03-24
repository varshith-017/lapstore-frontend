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
        // 🔐 LOGIN
        const res = await API.post("/auth/login", {
          username: data.username,
          password: data.password
        });

        // ✅ STORE USER DATA
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);

        alert("Login successful ✅");

        window.location.href = "/home";
      } else {
        // 📝 REGISTER
        const res = await API.post("/auth/register", data);

        alert("Account Created ✅");

        // switch to login after register
        setIsLogin(true);

        // clear fields
        setData({
          username: "",
          email: "",
          password: ""
        });
      }
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Something went wrong ❌"
      );
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-box">

        <h1 className="brand">SmartTech</h1>

        <h2>{isLogin ? "Login" : "Register"}</h2>

        {/* USERNAME */}
        <input
          placeholder="Username"
          value={data.username}
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        {/* EMAIL (ONLY REGISTER) */}
        {!isLogin && (
          <input
            placeholder="Email"
            value={data.email}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        {/* BUTTON */}
        <button onClick={submit}>
          {isLogin ? "Login" : "Register"}
        </button>

        {/* TOGGLE */}
        <p
          className="toggle"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New user? Register"
            : "Already have account? Login"}
        </p>

      </div>
    </div>
  );
}