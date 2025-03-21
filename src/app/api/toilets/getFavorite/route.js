import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Favorite from "@/models/Favorite";

// ✅ GETメソッドで userId に基づくお気に入りトイレを取得
export async function GET(req) {
  try {
    await connectToDatabase(); // DB接続

    const url = new URL(req.url, `http://${req.headers.get("host")}`);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    console.log("🟢 Fetching favorites for user:", userId);

    const favorite = await Favorite.findOne({ user: userId }).populate("toilets");

    if (!favorite || favorite.toilets.length === 0) {
      console.warn("⚠️ No favorites found for user:", userId);
      return NextResponse.json([], { status: 200 }); // ← 配列で返すことで UI 側も安全に動作
    }

    return NextResponse.json(favorite.toilets, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching favorite toilets:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
