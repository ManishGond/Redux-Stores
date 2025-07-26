import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import productRoutes from './routes/productRoutes'
import cartRoutes from './routes/cartRoutes'
import userRoutes from './routes/userRoutes'
import adminRoutes from './routes/adminRoutes'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

//routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)

export default app;