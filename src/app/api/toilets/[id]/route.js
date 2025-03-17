import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Toilet from "@/models/Toilet";
import mongoose from "mongoose";

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

export async function PATCH(req, { params }) {
  try {
    const toiletId = params.id;
    console.log(`🟢 [API] Updating toilet with ID: ${toiletId}`);
    if (!mongoose.Types.ObjectId.isValid(toiletId)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }
    await connectToDatabase();
    const toilet = await Toilet.findById(toiletId);
    if (!toilet) {
      return NextResponse.json({ error: "Toilet not found" }, { status: 404 });
    }
    const { rating, comment } = await req.json();
    if (!rating || !comment) {
      return NextResponse.json({ error: "Rating and comment are required" }, { status: 400 });
    }
    toilet.ratings.push(Number(rating));
    toilet.comments.push(comment);
    await toilet.updateAverageRating();
    console.log("🟢 [API] Toilet updated successfully:", toilet);

    return NextResponse.json({ message: "Toilet updated successfully", toilet }, { status: 200 });
  } catch (error) {
    console.error("🔴 [ERROR] Updating toilet failed:", error);
    return NextResponse.json({ error: "Failed to update toilet" },{status:500})
  }
}