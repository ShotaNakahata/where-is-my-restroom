import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI){
  throw new Error("MONGODB_URI is not defined in .env.local");
}
// ⬇️なぜこれが必要？
// Next.js は開発モード (next dev) でホットリロードするため、mongoose の接続が毎回作り直される → これを防ぐ
// 接続が作り直されるとパフォーマンスが低下する → cached を利用して解決
let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;  // ✅ 既に接続済みならそれを再利用する

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

global.mongoose = cached;