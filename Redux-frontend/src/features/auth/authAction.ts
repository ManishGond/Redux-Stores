import { login, logout } from "./userSlice";
import axios from "../../api/axios";
import type { AppDispatch } from "../../stores/store";

export const loadUserProfile = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get("/users/profile");
    dispatch(
      login({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        token: localStorage.getItem("token")!,
      })
    );
  } catch (error) {
    dispatch(logout());
    console.error("Session expired or invalid.");
  }
};

