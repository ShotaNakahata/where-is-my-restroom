import { NextResponse } from "next/server";
import upload from "@/lib/multer";
import Toilet from "@/models/Toilet";
import { connectToDatabase } from "@/lib/mongodb";

export const config = {
  api: {
    bodyParser: false,  // ✅ `multer` を使うので `bodyParser` を無効化
  },
};

export async function POST(req) {
  try {
    console.log("🟢 [API] Registering new toilet...");
    await connectToDatabase();

    const formData = await req.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const rating = Number(formData.get("rating"));
    const comment = formData.get("comments")?.trim() || ""; // 🔹 1つだけ取得
    const isUniversal = formData.get("isUniversal") === "true";
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "/images/placeholder.webp";

    // 🔹 必須項目のチェック
    if (!name || !address || rating === undefined) {
      return NextResponse.json({ error: "Name, address, and rating are required" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    // ✅ `comments` は `Array` に格納（空文字なら空の配列）
    const comments = comment ? [comment] : [];

    // 🔹 トイレを作成
    const newToilet = await Toilet.create({
      name,
      address,
      ratings: [rating], // ✅ `ratings` は配列として保存
      averageRating: rating, // ✅ `averageRating` は最初の `rating`
      comments, // ✅ `comments` は配列として保存
      isUniversal,
      image: imageUrl,
    });

    return NextResponse.json({ message: "Toilet registered successfully!", toilet: newToilet }, { status: 201 });
  } catch (error) {
    console.error("🔴 [ERROR] Registering toilet failed:", error);
    return NextResponse.json({ error: "Failed to register toilet" }, { status: 500 });
  }
}
// ---------------------------
export async function GET() {
  try {
    console.log("🟢 [API] /api/toilets - GET request received");
    await connectToDatabase();
    const toilets = await Toilet.find().sort({ createdAt: -1 });
    return NextResponse.json(toilets, { status: 200 });
  } catch (error) {
    console.error("🔴 [ERROR] Fetching toilets failed:", error);
    return NextResponse.json({ error: "Failed to fetch toilets" }, { status: 500 });
  }
}

