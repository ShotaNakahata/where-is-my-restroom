import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Toilet from "@/models/Toilet";

export async function GET(req, { params }) {
  try {
    console.log(`🟢 [API] Fetching toilet with ID: ${params.id}`);
    await connectToDatabase();
    const toilet = await Toilet.findById(params.id);
    if (!toilet) {
      return NextResponse.json({ error: "Toilet not found" }, { status: 404 });
    }
    return NextResponse.json(toilet, { status: 200 });

  } catch (error) {
    console.error("🔴 [ERROR] Fetching toilet failed:", error);
    return NextResponse.json({ error: "Failed to fetch toilet" }, { status: 500 });
  }
}