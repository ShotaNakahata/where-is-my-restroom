import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },  // ✅ ユーザーごとに1つのデータにする
  toilets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Toilet" }],  // ✅ お気に入りのトイレを配列で管理
}, { timestamps: true });

export default mongoose.models.Favorite || mongoose.model("Favorite", FavoriteSchema);
