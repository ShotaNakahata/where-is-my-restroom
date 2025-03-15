import { NextResponse } from "next/server";
import upload from "@/lib/multer";
import Toilet from "@/models/Toilet";
import { connectToDatabase } from "@/lib/mongodb";

export const config = {
  api: {
    bodyParser: false,  // ✅ `multer` を使うので `bodyParser` を無効化
  },
};

// export async function POST(req) {
//   console.log("🟢 [API] /api/toilets - POST request received");

//   return new Promise((resolve, reject) => {
//     upload.single("image")(req, {}, async (err) => {
//       if (err) {
//         console.error("🔴 [ERROR] Image upload error:", err);
//         return resolve(NextResponse.json({ error: "Image upload failed!" }, { status: 500 }));
//       }

//       try {
//         console.log("🟢 [API] /api/toilets - start connecting DB")
//         await connectToDatabase();

//         // ✅ `FormData` を取得する
//         const formData = await req.formData();

//         // ✅ フォームデータのバリデーション（`name` と `address` は必須）
//         const name = formData.get("name");
//         const address = formData.get("address");
//         if (!name || !address) {
//           console.error("🔴 [ERROR] Missing required fields");
//           return resolve(NextResponse.json({ error: "Missing required fields" }, { status: 400 }));
//         }

//         const rating = formData.get("rating") || "0";
//         const comments = formData.get("comments")?.trim() || "";
//         const isUniversal = formData.get("isUniversal") === "true";

//         // ✅ `image` の処理（アップロードがない場合は `placeholder` 画像）
//         const imageUrl = req.file ? `/uploads/${req.file.filename}` : "/images/placeholder.webp";

//         console.log("🟢 [INFO] Creating new Toilet record...");
//         const newToilet = await Toilet.create({
//           name,
//           address,
//           ratings: [rating], 
//           averageRating: rating,
//           comments: comments ? [comments] : [], 
//           isUniversal,
//           image: imageUrl,
//         });

//         console.log("🟢 [SUCCESS] Toilet registered successfully:", newToilet);
//         return resolve(NextResponse.json({ message: "Toilet registered successfully!", toilet: newToilet }, { status: 201 }));
//       } catch (error) {
//         console.error("🔴 [ERROR] Database error:", error);
//         return resolve(NextResponse.json({ error: "Something went wrong" }, { status: 500 }));
//       }
//     });
//   });
// }
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

