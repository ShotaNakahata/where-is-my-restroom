import { connectToDatabase } from "@/lib/mongodb";
import Toilet from "@/models/Toilet";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, address, rating, comments, isUniversal, image } = await req.json();
    await connectToDatabase();
    const newToilet = await Toilet.create({
      name,
      address,
      rating,
      comments,
      isUniversal,
      image,
    });
    return NextResponse.json({ message: "Toilet registered successfully!", toilet: newToilet }, { status: 201 })
  } catch (error) {
    console.error("Toilet registration error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}