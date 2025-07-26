import { Link } from "react-router-dom";
import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>reduxShop.in</h1>
      <h2>Looking for something?</h2>
      <p>We're sorry. The page you entered is not available or doesn't exist.</p>
      <Link className={styles.link} to="/">Go to Home Page</Link>
    </div>
  );
};

export default NotFound;
