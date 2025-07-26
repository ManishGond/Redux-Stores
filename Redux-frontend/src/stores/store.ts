import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
// store.ts
export type AppDispatch = typeof store.dispatch;

