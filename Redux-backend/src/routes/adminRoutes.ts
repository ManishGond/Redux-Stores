import { Router } from "express";
import {
  bulkAddProducts,
  deleteManyProducts,
  listAllUsers,
  deleteUsers,
} from "../controllers/adminController";
import { verifyToken } from "../middleware/authMiddleware";
import { checkAdmin } from "../middleware/checkAdmin";

const adminRoutes = Router();

adminRoutes.use(verifyToken, checkAdmin);

adminRoutes.post("/products/bulk", bulkAddProducts);
adminRoutes.delete("/products/bulk", deleteManyProducts);

adminRoutes.get("/users", listAllUsers);
adminRoutes.delete("/users", deleteUsers);

export default adminRoutes;
