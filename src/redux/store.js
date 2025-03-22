"use client"; 
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import favoriteReducer from "@/redux/slices/favoriteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorite:favoriteReducer
  }
})

export default store;