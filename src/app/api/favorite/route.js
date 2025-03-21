import { connectToDatabase } from "@/lib/mongodb";
import Favorite from "@/models/Favorite";

export async function GET(req) {
  try {
    console.log("🟢 [API] /api/favorite - GET request received");
    await connectToDatabase(); // ✅ MongoDB に接続

    const url = new URL(req.url, `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      console.error("❌ Missing userId in request");
      return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }

    console.log("🟢 Fetching favorites for user:", userId);

    let favorite = await Favorite.findOne({ user: userId }).populate("toilets");

    if (!favorite) {
      console.log("⚠️ No favorites found for user:", userId);
      return new Response(JSON.stringify([]), { status: 200 }); // ✅ 空のリストを返す
    }

    return new Response(JSON.stringify(favorite.toilets), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching favorite toilets:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
