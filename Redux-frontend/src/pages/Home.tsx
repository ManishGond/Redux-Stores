import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/store";
import { fetchProducts } from "../features/product/productSlice";
import ProductCard from "../components/ProductCard";
import styles from "../styles/App.module.css";
import { socket } from "../socket/socket"; // 👈 import socket

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());

    // ✅ Socket listeners
    socket.on("productAdded", () => dispatch(fetchProducts()));
    socket.on("productDeleted", () => dispatch(fetchProducts()));

    // 🧼 Cleanup listeners
    return () => {
      socket.off("productAdded");
      socket.off("productDeleted");
    };
  }, [dispatch]);

  if (loading) return <p className="text-center mt-5">Loading products...</p>;
  if (error)
    return <p className="text-danger text-center mt-5">Error: {error}</p>;

  return (
    <div className={`container mt-4 ${styles.container}`}>
      {products.length === 0 ? (
        <p className="text-center text-muted mt-5">No products to show.</p>
      ) : (
        <div className="row g-3">
          {[...products].reverse().map((product) => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="h-100">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
