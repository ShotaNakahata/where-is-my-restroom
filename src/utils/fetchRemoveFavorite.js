export const fetchRemoveFavorite = async (userId, toiletId) => {
  try {
    const res = await fetch("/api/toilets/removeFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, toiletId })
    });
    if (!res.ok) {
      throw new Error("Failed to remove favorite");
    }
    const result = await res.json();
    
    return result
  } catch (error) {
    console.error("❌ Error removing favorite:", error);
    throw error;
  }

}