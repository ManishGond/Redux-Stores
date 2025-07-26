import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getCart, addToCart, removeFromCart, clearCart, incrementCartItem, decrementCartItem } from "../controllers/cartController";

const cartRoutes = Router();

cartRoutes.get("/", verifyToken, getCart);
cartRoutes.post("/add", verifyToken, addToCart);
cartRoutes.delete("/remove", verifyToken, removeFromCart);
cartRoutes.delete("/clear", verifyToken, clearCart);
cartRoutes.post("/increment", verifyToken, incrementCartItem);
cartRoutes.post("/decrement", verifyToken, decrementCartItem);


export default cartRoutes;
