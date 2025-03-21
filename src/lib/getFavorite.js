export const fetchFavorites = async (userId) => {
  try {
    console.log("🔍 fetchFavorites called with id:", userId);

    const response = await fetch(`/api/favorite?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching favorites:", error);
    throw error;
  }
};




