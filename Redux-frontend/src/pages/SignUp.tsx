import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/userSlice";
import axios from "../api/axios";
import styles from "../styles/Login.module.css";
import storeLogo from "../assets/images/redux-logo.svg"; // ✅ Add this

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/auth/signup", form);

      setTimeout(() => {
        dispatch(
          login({
            ...response.data.user,
            token: response.data.token,
          })
        );
        navigate("/");
      }, 3000);
    } catch (error: any) {
      alert(error.response?.data?.error || "Signup Failed");
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.logoBox}>
        <img src={storeLogo} alt="redux logo" className={styles.logo} />
        <h1 className={styles.logoText}>reduxStore</h1>
      </div>

      <form onSubmit={handleSignUp} className={styles.form}>
        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" className={styles.loginBtn} disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className={styles.switch}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
