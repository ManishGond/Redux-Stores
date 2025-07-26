import { Router } from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController";

const cartRoutes = Router();

cartRoutes.get("/", getCart);
cartRoutes.post("/", addToCart);
cartRoutes.post("/:id", removeFromCart);

export default cartRoutes;
