"use client";
// お気に入りの追加・削除 + モーダル制御 + Redux 更新
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddFavorite } from "@/utils/fetchAddFavorite";
import { fetchRemoveFavorite } from "@/utils/fetchRemoveFavorite";
import { pushFavorite, removeFavorite } from "@/redux/slices/favoriteSlice";

export function useFavoriteAction() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleFavorite = async (toilet, isFavorite) => {
    if (!auth.isAuthenticated) {
      setIsLoginOpen(true);
      return;
    }

    try {
      if (isFavorite) {
        await fetchRemoveFavorite(auth.user._id, toilet._id);
        dispatch(removeFavorite(toilet._id));
        setModalData({
          message: "Removed from Favorites!",
          description: "This restroom has been removed from your favorites.",
          btnMessage: "OK",
        });
      } else {
        await fetchAddFavorite(auth.user._id, toilet._id);
        dispatch(pushFavorite(toilet));
        setModalData({
          message: "Added to Favorites!",
          description: "This restroom has been added to your favorites.",
          btnMessage: "OK",
        });
      }

      setIsModalOpen(true);
    } catch (error) {
      setModalData({
        message: "Favorite Action Failed",
        description: "An error occurred. Please try again later.",
        btnMessage: "Close",
      });
      setIsModalOpen(true);
      console.error("❌ Favorite toggle failed:", error);
    }
  };

  return {
    isLoginOpen,
    isModalOpen,
    modalData,
    setIsLoginOpen,
    setIsModalOpen,
    toggleFavorite,
  };
}
