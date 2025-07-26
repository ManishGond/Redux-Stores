import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/userSlice";
import axios from "../api/axios";
import styles from "../styles/Login.module.css";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/auth/login", loginForm);

      setTimeout(() => {
        dispatch(
          login({
            ...response.data.user,
            token: response.data.token,
          })
        );
        navigate("/");
      }, 3000); // simulate 3 sec loading
    } catch (error: any) {
      alert(error.response?.data?.error || "Login Failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        type="email"
        value={loginForm.email}
        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
        required
      />
      <input
        placeholder="Password"
        type="password"
        value={loginForm.password}
        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        required
      />

      <button type="submit" className={styles.loginBtn} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className={styles.switch}>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </form>
  );
};

export default Login;
