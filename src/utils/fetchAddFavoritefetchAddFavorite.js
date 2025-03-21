export const fetchAddFavorite = async (userId, toiletId) => {
  try {
    console.log("🟢 Adding favorite - User:", userId, "Toilet:", toiletId);

    const response = await fetch("/api/toilets/addFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, toiletId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add favorite");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error adding favorite:", error);
    throw error;
  }
};
