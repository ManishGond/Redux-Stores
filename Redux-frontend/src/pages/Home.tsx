import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/store";
import { fetchProducts } from "../features/product/productSlice";
import ProductCard from "../components/ProductCard";
import styles from "../styles/App.module.css"; // Optional: if you're using any container/grid utility

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-5">Loading products...</p>;
  if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;

  return (
    <div className={`container mt-4 ${styles.container}`}>
      {/* 🔁 Check for empty product list */}
      {products.length === 0 ? (
        <p className="text-center text-muted mt-5">No products to show.</p>
      ) : (
        <div className="row g-3">
          {[...products].reverse().map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3">
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
