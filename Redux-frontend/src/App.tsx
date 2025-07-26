import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Layout from "./Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserProfile } from "./features/auth/authAction";
import { type AppDispatch } from "./stores/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      dispatch(loadUserProfile())
    }
  }, [dispatch])
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={"<HomePage />"} />
        <Route path="/cart" element={"<CartPage />"} />
      </Route>

      {/* Routes without Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Error Page*/}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
