import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

// ✅ Mongoose の接続キャッシュを利用
let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn; // 既に接続済みならそれを再利用する

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {}).then((mongoose) => mongoose); // ✅ `useNewUrlParser` と `useUnifiedTopology` を削除
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

global.mongoose = cached;
