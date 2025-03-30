// src/app/api/toilets/route.js
import { NextResponse } from "next/server";
import { getLocationData } from "@/utils/getLocationData";
import Toilet from "@/models/Toilet";
import { connectToDatabase } from "@/lib/mongodb";

export const config = {
  api: {
    bodyParser: false,  
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

    //国、緯度経度を取得
    const { country, latitude, longitude } = await getLocationData(address)
    console.log("国、緯度経度を表示", country, latitude, longitude)

    // ✅ `comments` は `Array` に格納（空文字なら空の配列）
    const comments = comment ? [comment] : [];

    // 🔹 トイレを作成
    const newToilet = await Toilet.create({
      name,
      address,
      country,
      latitude,
      longitude,
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

export async function GET(req) {
  try {
    console.log("🟢 [API] /api/toilets - GET request received");
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const limitParam = searchParams.get("limit");
    const offsetParam = searchParams.get("offset");

    const limit = limitParam !== null ? parseInt(limitParam, 10) : null;
    const offset = offsetParam !== null ? parseInt(offsetParam, 10) : null;

    let query = Toilet.find().sort({ createdAt: -1 });

    if (limit !== null && offset !== null) {
      query = query.skip(offset).limit(limit);
    }

    const toilets = await query.exec();

    return NextResponse.json(toilets, { status: 200 });
  } catch (error) {
    console.error("🔴 [ERROR] Fetching toilets failed:", error);
    return NextResponse.json({ error: "Failed to fetch toilets" }, { status: 500 });
  }
}
