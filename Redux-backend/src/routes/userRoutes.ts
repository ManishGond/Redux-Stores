import { Router } from "express";
import { getUserProfile } from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";

const userRoutes = Router()

userRoutes.get('/profile', verifyToken, getUserProfile)

export default userRoutes