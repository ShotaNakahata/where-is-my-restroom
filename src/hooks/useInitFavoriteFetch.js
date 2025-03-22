// favoriteが必要なpageでloginしていてfavoriteを一度も取得していない場合
// favoriteを取得してreduxに登録する
"use client";

import { fetchFavorites } from "@/lib/getFavorite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "@/redux/slices/favoriteSlice";

export function useInitFavoriteFetch() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { favoriteToilets } = useSelector((state) => state.favorite);

  useEffect(() => {
    if (isAuthenticated &&
      user?._id &&
      (!favoriteToilets || favoriteToilets.length === 0)
    ) {
      console.log("🟢 useInitFavoriteFetch: fetching favorites...");
      fetchFavorites(user._id)
        .then((favorites) => dispatch(setFavorites(favorites)))
        .catch((err) => console.error("❌ Failed to load favorites:", err));
    }
  }, [isAuthenticated, user?._id, favoriteToilets, dispatch]);
}