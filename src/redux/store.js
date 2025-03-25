"use client"; 
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import favoriteReducer from "@/redux/slices/favoriteSlice";
import toiletsReducer from "@/redux/slices/toiletsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toilets:toiletsReducer,
    favorite:favoriteReducer,
  }
})

export default store;