import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Toilet from "@/models/Toilet";

export async function DELETE() {
  try {
    console.log("🟢 [API] Deleting all toilets...");

    // MongoDB に接続
    await connectToDatabase();

    // すべてのトイレデータを削除
    await Toilet.deleteMany({});

    console.log("✅ Successfully deleted all toilets.");
    return NextResponse.json({ message: "All toilets deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("🔴 [ERROR] Failed to delete toilets:", error);
    return NextResponse.json({ error: "Failed to delete toilets" }, { status: 500 });
  }
}
