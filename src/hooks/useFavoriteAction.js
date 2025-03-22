"use client";
// add Favoriteをしてそのままmodal等を表示する
// もしloginされていなかったらloginModalも表示
import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchAddFavorite } from "@/utils/fetchAddFavorite";
import { useDispatch } from "react-redux";
import { pushFavorite } from "@/redux/slices/favoriteSlice";

export function useFavoriteAction() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const addFavorite = async (toilet) => {
    if (!auth.isAuthenticated) {
      setIsLoginOpen(true);
    } else {
      try {
        await fetchAddFavorite(auth.user._id, toilet._id);
        dispatch(pushFavorite(toilet));
        setModalData({
          message: "Added to Favorites!",
          description: "This restroom has been added to your favorites.",
          btnMessage: "OK",
        });
        setIsModalOpen(true);
      } catch (error) {
        setModalData({
          message: "Failed to Add Favorite",
          description: "An error occurred while adding the restroom to favorites.",
          btnMessage: "Try Again",
        });
        setIsModalOpen(true);
        console.error("❌ Failed to add favorite:", error);
      }
    }
  };

  return {
    isLoginOpen,
    isModalOpen,
    modalData,
    setIsLoginOpen,
    setIsModalOpen,
    addFavorite,
  };
}
