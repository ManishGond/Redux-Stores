import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import type { RootState } from "../stores/store"
import { logout } from "../features/auth/userSlice"

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <nav>
      <Link to={"/"}>Home</Link> | <Link to={"/cart"}>Cart</Link>
      {
        user.isLoggedIn ? (
          <>
            <span style={{ marginLeft: '10px' }}>Hi, {user.name}</span>
            <button onClick={() => { dispatch(logout()); navigate('/login'); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
          </>
        )
      }
    </nav>
  )
}

export default Navbar