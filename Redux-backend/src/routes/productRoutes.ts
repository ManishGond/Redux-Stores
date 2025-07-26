import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts } from "../controllers/productController";
import { verifyToken } from "../middleware/authMiddleware";
import { checkAdmin } from "../middleware/checkAdmin";

const productRoutes = Router();
productRoutes.get("/", getAllProducts);
productRoutes.post("/", verifyToken, checkAdmin, createProduct);
productRoutes.delete("/:id", verifyToken, checkAdmin, deleteProduct); // NEW

export default productRoutes;