import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Layout from "./Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserProfile } from "./features/auth/authAction";
import { type AppDispatch } from "./stores/store";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { fetchCart } from "./features/cart/cartSlice";
import NotFound from "./pages/NotFound";
import AddProduct from "./pages/AddProduct";
import { ToastContainer } from "react-toastify";
import ProductDetail from "./components/ProductDetails";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      dispatch(loadUserProfile())
      dispatch(fetchCart())
    }
  }, [dispatch])
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>

        {/* Routes without Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Error Page*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
