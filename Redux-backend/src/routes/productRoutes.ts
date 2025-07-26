import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/productController";

const productRoutes = Router();
productRoutes.get("/", getAllProducts)
productRoutes.post("/", createProduct)

export default productRoutes;