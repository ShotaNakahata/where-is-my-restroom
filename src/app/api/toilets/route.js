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
  console.log("🟢 [API] /api/toilets - POST request received");

  return new Promise((resolve, reject) => {
    upload.single("image")(req, {}, async (err) => {
      if (err) {
        console.error("🔴 [ERROR] Image upload error:", err);
        return resolve(NextResponse.json({ error: "Image upload failed!" }, { status: 500 }));
      }

      try {
        await connectToDatabase();

        // ✅ `FormData` を取得する
        const formData = await req.formData();

        // ✅ フォームデータのバリデーション（`name` と `address` は必須）
        const name = formData.get("name");
        const address = formData.get("address");
        if (!name || !address) {
          console.error("🔴 [ERROR] Missing required fields");
          return resolve(NextResponse.json({ error: "Missing required fields" }, { status: 400 }));
        }

        const rating = formData.get("rating") || "0";
        const comments = formData.get("comments")?.trim() || "";
        const isUniversal = formData.get("isUniversal") === "true";

        // ✅ `image` の処理（アップロードがない場合は `placeholder` 画像）
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : "/images/placeholder.webp";

        console.log("🟢 [INFO] Creating new Toilet record...");
        const newToilet = await Toilet.create({
          name,
          address,
          rating: parseFloat(rating),
          comments,
          isUniversal,
          image: imageUrl,
        });

        console.log("🟢 [SUCCESS] Toilet registered successfully:", newToilet);
        return resolve(NextResponse.json({ message: "Toilet registered successfully!", toilet: newToilet }, { status: 201 }));
      } catch (error) {
        console.error("🔴 [ERROR] Database error:", error);
        return resolve(NextResponse.json({ error: "Something went wrong" }, { status: 500 }));
      }
    });
  });
}


