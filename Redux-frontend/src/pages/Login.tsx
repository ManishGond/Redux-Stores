import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/userSlice";
import axios from "../api/axios";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })
  const dispatch = useDispatch(); // hook from react-redux pkg
  const navigate = useNavigate(); // hook from react-router-dom pkg

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", loginForm);
      dispatch(
        login({
          ...response.data.user,
          token: response.data.token,
        })
      );
      console.log(response.status)
      navigate("/");
    } catch (error: any) {
      alert(error.response?.data?.error || "Login Failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
