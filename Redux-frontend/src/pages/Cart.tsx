import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/store";
import styles from "../styles/Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.cart);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  if (loading) return <p>Loading...</p>;
  if (items.length === 0) return <p className={styles.cartTitle}>Your cart is empty.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.cartTitle}>Shopping Cart</h2>

      {items.map((item) => (
        <div key={item.product.id} className={styles.cartItem}>
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className={styles.cartImage}
          />

          <div className={styles.cartDetails}>
            <h4>{item.product.name}</h4>
            <p>₹{item.product.price.toFixed(2)}</p>
            <div className={styles.actions}>
              <button onClick={() => dispatch(decrementQuantity(item.product.id))}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(incrementQuantity(item.product.id))}>+</button>
              <button
                onClick={() => dispatch(removeFromCart(item.product.id))}
                className={styles.removeBtn}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.summary}>
        <p>
          <strong>
            Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items): ₹
            {totalAmount.toFixed(2)}
          </strong>
        </p>
        <button className={styles.clearBtn} onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
