import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectToDatabase();

    // ✅ ユーザーが存在するか確認
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    // ✅ パスワードを比較
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user.toObject();
    console.log("from route userWithoutPassword :",userWithoutPassword)
    return NextResponse.json({ message: "Login successful!", user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}