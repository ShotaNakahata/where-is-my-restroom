import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Favorite from "@/models/Favorite";

export async function POST(req) {
  try {
    await connectToDatabase(); // ✅ DB接続

    const { userId, toiletId } = await req.json();

    if (!userId || !toiletId) {
      return NextResponse.json({ error: "Missing userId or toiletId" }, { status: 400 });
    }

    let favorite = await Favorite.findOne({ user: userId });

    if (favorite) {
      const index = favorite.toilets.indexOf(toiletId);

      if (index !== -1) {
        // ✅ すでに登録済み → 削除
        favorite.toilets.splice(index, 1);
        await favorite.save();
        return NextResponse.json({ message: "Favorite removed successfully", removed: true }, { status: 200 });
      } else {
        // ✅ 未登録 → 追加
        favorite.toilets.push(toiletId);
        await favorite.save();
        console.log("🟢登録成功")
        return NextResponse.json({ message: "Favorite added successfully", added: true }, { status: 200 });
      }
    } else {
      // ✅ 初めてのお気に入り登録
      const newFavorite = new Favorite({
        user: userId,
        toilets: [toiletId],
      });
      await newFavorite.save();
      return NextResponse.json({ message: "Favorite created successfully", added: true }, { status: 201 });
    }
  } catch (error) {
    console.error("❌ Error in addFavorite:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
