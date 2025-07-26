import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../stores/store";
import styles from "../styles/ProductDetail.module.css";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../features/cart/cartSlice";
import { deleteProduct, fetchProducts } from "../features/product/productSlice";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.products.products);
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.product.id === Number(id))
  );

  // Fetch products if not available (e.g. on page reload)
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products.length, dispatch]);

  const product = products.find((p) => p.id === Number(id));
  if (!product) return <p>Loading product...</p>;

  const isAdmin = user.email === "manish.n.gond@gmail.com";
  const estimatedDelivery = "Monday, 1 Aug";

  const handleAddToCart = () => dispatch(addToCart(product.id));
  const handleIncrement = () => dispatch(incrementQuantity(product.id));
  const handleDecrement = () => dispatch(decrementQuantity(product.id));

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;
    const result = await dispatch(deleteProduct(product.id));
    if (deleteProduct.fulfilled.match(result)) {
      toast.success("✅ Product deleted!");
      dispatch(fetchProducts());
    } else {
      toast.error("❌ Failed to delete product!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className={styles.detailSection}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.priceBlock}>
          <span className={styles.currentPrice}>₹{product.price}</span>
          <span className={styles.mrp}>M.R.P.: ₹{product.price + 100}</span>
          <span className={styles.discount}>
            ({Math.round((100 * 100) / (product.price + 100))}% off)
          </span>
        </div>

        <p className={styles.delivery}>FREE Delivery: {estimatedDelivery}</p>
        <p className={styles.inStock}>In stock</p>

        <div className={styles.actions}>
          {cartItem ? (
            <div className={styles.counterWrapper}>
              <button onClick={handleDecrement} className={styles.counterBtn}>
                −
              </button>
              <span className={styles.quantity}>{cartItem.quantity}</span>
              <button onClick={handleIncrement} className={styles.counterBtn}>
                +
              </button>
            </div>
          ) : (
            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}
          <button
            className={styles.buyNowBtn}
            onClick={() =>
              toast.info(
                "😂 Haha! This is just a dummy website — but thank you for thinking to buy from us!",
                { autoClose: 4000 }
              )
            }
          >
            Buy Now
          </button>

        </div>

        {isAdmin && (
          <button className={styles.deleteBtn} onClick={handleDelete}>
            ❌ Delete Product (Admin)
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
