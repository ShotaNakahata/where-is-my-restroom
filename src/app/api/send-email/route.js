import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();
    // process.env.EMAIL_USER　なぜこのように書くと.envから値を取得できるのでしょうか？processとはなんでしょうか？
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    })
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: subject,
      text: `FROM:${email}\n\nMessage:\n${message}`
    }
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: "メールが送信されました！" }, { status: 200 })
  } catch (error) {
    console.error("メール送信エラー", error);
    return NextResponse.json({ error: "メールの送信に失敗しました。" }, { status: 500 })
  }
}