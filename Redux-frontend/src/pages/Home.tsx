import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/store";
import { fetchProducts } from "../features/product/productSlice";
import { addToCart, decrementQuantity, incrementQuantity } from "../features/cart/cartSlice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const { isLoggedIn } = useSelector((state: RootState) => state.user)
  const cart = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleAddToCart = (productId: number) => {
    if (!isLoggedIn) {
      alert("Please login to add items to your cart.");
      return;
    }
    dispatch(addToCart(productId));
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {products.map((product) => {
          const cartItem = cart.items.find((item) => item.product.id === product.id);

          return (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                width: "200px",
                borderRadius: "8px",
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                width={180}
                height={180}
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <strong>₹{product.price}</strong>

              {/* Cart UI */}
              <div style={{ marginTop: "10px" }}>
                {cartItem ? (
                  <div>
                    <button onClick={() => dispatch(decrementQuantity(product.id))}>−</button>
                    <span style={{ margin: "0 10px" }}>{cartItem.quantity}</span>
                    <button onClick={() => dispatch(incrementQuantity(product.id))}>+</button>
                  </div>
                ) : (
                  <button onClick={() => handleAddToCart(product.id)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
