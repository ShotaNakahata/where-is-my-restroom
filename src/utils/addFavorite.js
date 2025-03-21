import { fetchAddFavorite } from "@/utils/fetchAddFavorite";

export async function addFavorite({ setIsLoginOpen, setIsModalOpen, setModalData, auth, toilet }) {
  const { user, isAuthenticated } = auth
  if (!isAuthenticated) {
    console.log("not login");
    setIsLoginOpen(true);
  } else {
    try {
      await fetchAddFavorite(user._id, toilet._id);
      setIsModalOpen(true);
      setModalData({
        message: "Added to Favorites!",
        description: "This restroom has been added to your favorites.",
        btnMessage: "OK",
      })
      console.log("🟢 Favorite added successfully!");
    } catch (error) {
      setIsModalOpen(true);
      setModalData({
        message: "Failed to Add Favorite",
        description: "An error occurred while adding the restroom to favorites.",
        btnMessage: "Try Again",
      })
      console.error("❌ Failed to add favorite:", error);
    }
  }
}