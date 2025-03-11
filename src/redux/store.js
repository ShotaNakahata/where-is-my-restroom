import { configureStore } from "@reduxjs/toolkit";
import refReducer from "@/redux/slices/refSlice";

export const store = configureStore({
  reducer: {
    ref: refReducer,
  }
})

export default store;