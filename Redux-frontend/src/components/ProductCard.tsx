import styles from '../styles/ProductCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../stores/store';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '../features/cart/cartSlice';
import { fetchProducts, type Product } from '../features/product/productSlice';
import { deleteProduct } from '../features/product/productSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.product.id === product.id)
  );

  const user = useSelector((state: RootState) => state.user);
  const isAdmin = user.email === 'manish.n.gond@gmail.com';

  const handleAddToCart = () => dispatch(addToCart(product.id));

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    const resultAction = await dispatch(deleteProduct(product.id));

    if (deleteProduct.fulfilled.match(resultAction)) {
      toast.success("✅ Product deleted!");
      dispatch(fetchProducts());
    } else {
      toast.error("❌ Failed to delete product!");
    }
  };

  const estimatedDelivery = "Fri, 1 Aug"; // Mocked

  return (
    <div className={styles.card}>
      {/* Image */}
      <div className={styles.imageContainer}>
        <img
          src={product.imageUrl}
          alt={product.name}
        />
        {isAdmin && (
          <button className={styles.deleteBtn} onClick={handleDelete}>
            ❌
          </button>
        )}
      </div>

      {/* Product Title as Link */}
      <Link to={`/product/${product.id}`} className={styles.titleLink}>
        {product.name}
      </Link>

      {/* Description */}
      <div className={styles.description}>
        {product.description}
      </div>

      {/* Price + Discount */}
      <div className={styles.priceRow}>
        <strong>₹{product.price}</strong>
        <span className={styles.mrp}>₹{product.price + 100}</span>
        <span className={styles.discount}>
          ({Math.round((100 * 100) / (product.price + 100))}% off)
        </span>
      </div>

      {/* Delivery Date */}
      <div className={styles.delivery}>FREE delivery {estimatedDelivery}</div>

      {/* Cart Actions */}
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
