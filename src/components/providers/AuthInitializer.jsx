"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {  // ✅ クライアントサイドでのみ実行
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        dispatch(login(JSON.parse(storedUser)));  // ✅ Redux に `localStorage` のデータを適用
      }
    }
  }, [dispatch]);

  return null;  // ✅ UI には何も表示しない
}
