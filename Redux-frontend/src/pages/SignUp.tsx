import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from '../features/auth/userSlice'
import axios from "../api/axios";


const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/auth/signup', form)
      dispatch(login({
        ...response.data.user,
        token: response.data.token
      }))
      console.log(response.status)
      navigate("/")
    } catch (error: any) {
      alert(error.response?.data?.error || 'Signup Failed')
    }
  }
  return (
    <form onSubmit={handleSignUp}>
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
