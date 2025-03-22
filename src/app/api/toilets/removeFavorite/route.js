import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Favorite from "@/models/Favorite";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { userId, toiletId } = await req.json();
    if (!userId || !toiletId) {
      return NextResponse.json({ error: "Missing userId or toiletId" }, { status: 400 });
    }

    const favorite = await Favorite.findOne({ user: userId });
    if (!favorite) {
      return NextResponse.json({ error: "No favorite record found" }, { status: 404 });
    }

    favorite.toilets = favorite.toilets.filter(
      (t) => t.toString() !== toiletId.toString()
    );

    await favorite.save();
    return NextResponse.json({ message: "Favorite removed successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error in removeFavorite:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}