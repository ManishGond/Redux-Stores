import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/store";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.cart);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  if (loading) return <p>Loading...</p>;
  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Your Cart</h2>
      {items.map((item) => (
        <div
          key={item.product.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div>
            <h4>{item.product.name}</h4>
            <p>₹{item.product.price}</p>
          </div>
          <div>
            <button onClick={() => dispatch(decrementQuantity(item.product.id))}>−</button>
            <span style={{ margin: "0 10px" }}>{item.quantity}</span>
            <button onClick={() => dispatch(incrementQuantity(item.product.id))}>+</button>
            <button
              onClick={() => dispatch(removeFromCart(item.product.id))}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <p><strong>Total: ₹{totalAmount}</strong></p>
        <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      </div>
    </div>
  );
};

export default Cart;
