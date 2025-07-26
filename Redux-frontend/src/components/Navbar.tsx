import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../stores/store";
import { logout } from "../features/auth/userSlice";
import styles from "../styles/Navbar.module.css";
import storeLogo from '../assets/images/redux-logo.svg'

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isAdmin = user.email === "manish.n.gond@gmail.com";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src={storeLogo} alt="Redux Logo" className={styles.logo} />
        <span className={styles.title}>reduxStore</span>
      </div>

      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        {user.isLoggedIn && isAdmin && (
          <Link to="/add-product" className={styles.adminLink}>
            Add Product
          </Link>
        )}
      </div>

      <div className={styles.auth}>
        {user.isLoggedIn ? (
          <>
            <span className={styles.userName}>Hi, {user.name}</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.authBtn}>
              Login
            </Link>
            <Link to="/signup" className={styles.authBtnOutline}>
              Signup
            </Link>

          </>
        )}
      </div>
    </nav>

  );
};

export default Navbar;
