import { NextResponse } from "next/server";
import { getLocationData } from "@/utils/getLocationData";
import Toilet from "@/models/Toilet";
import { connectToDatabase } from "@/lib/mongodb";
import fs from "fs";
import path from "path";

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
		const comment = formData.get("comments")?.trim() || "";
		const isUniversal = formData.get("isUniversal") === "true";

		// 🔽 画像処理（req.file は使えない）
		const imageFile = formData.get("image");
		let imageUrl = "/images/placeholder.webp";

		if (imageFile && typeof imageFile === "object") {
			const arrayBuffer = await imageFile.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);
			const filename = `${Date.now()}_${imageFile.name}`;

			const uploadDir = path.join(process.cwd(), "public", "uploads");
			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir, { recursive: true });
			}

			const filePath = path.join(uploadDir, filename);
			fs.writeFileSync(filePath, buffer);

			imageUrl = `/uploads/${filename}`;
		}

		// 🔹 必須項目のチェック
		if (!name || !address || rating === undefined) {
			return NextResponse.json(
				{ error: "Name, address, and rating are required" },
				{ status: 400 },
			);
		}

		if (rating < 1 || rating > 5) {
			return NextResponse.json(
				{ error: "Rating must be between 1 and 5" },
				{ status: 400 },
			);
		}

		// 国・緯度経度取得
		const { country, latitude, longitude } = await getLocationData(address);
		console.log("国、緯度経度を表示", country, latitude, longitude);

		const comments = comment ? [comment] : [];

		const newToilet = await Toilet.create({
			name,
			address,
			country,
			latitude,
			longitude,
			ratings: [rating],
			averageRating: rating,
			comments,
			isUniversal,
			image: imageUrl,
		});

		return NextResponse.json(
			{ message: "Toilet registered successfully!", toilet: newToilet },
			{ status: 201 },
		);
	} catch (error) {
		console.error("🔴 [ERROR] Registering toilet failed:", error);
		return NextResponse.json(
			{ error: "Failed to register toilet" },
			{ status: 500 },
		);
	}
}

export async function GET(req) {
	try {
		console.log("🟢 [API] /api/toilets - GET request received");
		await connectToDatabase();

		const { searchParams } = new URL(req.url);

		const limitParam = searchParams.get("limit");
		const offsetParam = searchParams.get("offset");

		const limit = limitParam !== null ? Number.parseInt(limitParam, 10) : null;
		const offset =
			offsetParam !== null ? Number.parseInt(offsetParam, 10) : null;

		let query = Toilet.find().sort({ createdAt: -1 });

		if (limit !== null && offset !== null) {
			query = query.skip(offset).limit(limit);
		}

		const toilets = await query.exec();

		return NextResponse.json(toilets, { status: 200 });
	} catch (error) {
		console.error("🔴 [ERROR] Fetching toilets failed:", error);
		return NextResponse.json(
			{ error: "Failed to fetch toilets" },
			{ status: 500 },
		);
	}
}
