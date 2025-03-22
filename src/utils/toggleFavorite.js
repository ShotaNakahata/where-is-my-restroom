//　addかremoveか判断して実行するfn
// このfnを使用しているtoiletからそれがisFavoriteかどうかの情報を受け取りそれに応じて挙動を変更
// その後modalを表示
import { fetchAddFavorite } from "@/utils/fetchAddFavorite";
import { fetchRemoveFavorite } from "@/utils/fetchRemoveFavorite";
import { pushFavorite, removeFavorite } from "@/redux/slices/favoriteSlice";

export async function toggleFavorite({ setIsLoginOpen, setIsModalOpen, setModalData, auth, toilet, dispatch, isFavorite }) {
  const { user, isAuthenticated } = auth;

  if (!isAuthenticated) {
    console.log("not login");
    setIsLoginOpen(true);
    return;
  }

  try {
    if (isFavorite) {
      // すでに登録 → 削除
      await fetchRemoveFavorite(user._id, toilet._id);
      dispatch(removeFavorite(toilet._id));
      setModalData({
        message: "Removed from Favorites!",
        description: "This restroom has been removed from your favorites.",
        btnMessage: "OK",
      });
    } else {
      // 登録されていない → 追加
      await fetchAddFavorite(user._id, toilet._id);
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
}

