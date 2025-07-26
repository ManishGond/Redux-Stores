import styles from '../styles/ProductCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../stores/store';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '../features/cart/cartSlice';
import { type Product } from '../features/product/productSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.product.id === product.id)
  );

  const handleAddToCart = () => dispatch(addToCart(product.id));
  const estimatedDelivery = "Fri, 1 Aug"; // Mocked

  return (
    <div className={styles.card}>
      {/* Image */}
      <div className={styles.imageContainer}>
        <img
          src={product.imageUrl}
          alt={product.name}
        />
      </div>

      {/* Title Link */}
      <Link to={`/product/${product.id}`} className={styles.titleLink}>
        {product.name}
      </Link>

      {/* Description */}
      <div className={styles.description}>
        {product.description}
      </div>

      {/* Price Info */}
      <div className={styles.priceRow}>
        <strong>₹{product.price}</strong>
        <span className={styles.mrp}>₹{product.price + 100}</span>
        <span className={styles.discount}>
          ({Math.round((100 * 100) / (product.price + 100))}% off)
        </span>
      </div>

      {/* Delivery */}
      <div className={styles.delivery}>FREE delivery {estimatedDelivery}</div>

      {/* Cart Controls */}
      {cartItem ? (
        <div>
          <button
            className="btn btn-dark btn-sm mt-2"
            onClick={() => dispatch(decrementQuantity(product.id))}
          >
            −
          </button>
          <span style={{ margin: "0 10px" }}>{cartItem.quantity}</span>
          <button
            className="btn btn-secondary btn-sm mt-2"
            onClick={() => dispatch(incrementQuantity(product.id))}
          >
            +
          </button>
        </div>
      ) : (
        <button className={styles.btnAdd} onClick={handleAddToCart}>
          Add to cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
