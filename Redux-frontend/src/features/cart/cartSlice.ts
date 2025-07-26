import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../product/productSlice";
import axios from "../../api/axios";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/cart");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId: number, { rejectWithValue }) => {
    try {
      const res = await axios.post("/cart/add", { productId });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to add to cart"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: number, { rejectWithValue }) => {
    try {
      await axios.delete("/cart/remove", { data: { productId } });
      return productId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to remove item"
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete("/cart/clear");
      return true;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to clear cart"
      );
    }
  }
);

export const incrementQuantity = createAsyncThunk(
  "cart/incrementQuantity",
  async (productId: number, { rejectWithValue }) => {
    try {
      const res = await axios.post("/cart/increment", { productId });
      return { productId, quantity: res.data.quantity };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to increase quantity"
      );
    }
  }
);

export const decrementQuantity = createAsyncThunk(
  "cart/decrementQuantity",
  async (productId: number, { rejectWithValue }) => {
    try {
      const res = await axios.post("/cart/decrement", { productId });
      return { productId, quantity: res.data.quantity };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to decrease quantity"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        const newItem = action.payload;

        const existing = state.items.find(
          (i) => i.product.id === newItem.product.id
        );

        if (existing) {
          existing.quantity = newItem.quantity;
        } else {
          state.items.push(newItem);
        }
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.product.id !== action.payload
        );
      })

      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      })

      .addCase(incrementQuantity.fulfilled, (state, action) => {
        const item = state.items.find(
          (i) => i.product.id === action.payload.productId
        );
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })
      .addCase(decrementQuantity.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        if (quantity === 0) {
          state.items = state.items.filter((i) => i.product.id !== productId);
        } else {
          const item = state.items.find((i) => i.product.id === productId);
          if (item) {
            item.quantity = quantity;
          }
        }
      });
  },
});

export default cartSlice.reducer;
