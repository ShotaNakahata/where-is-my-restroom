import mongoose from "mongoose";

const ToiletSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  address: { type: String, required: true }, 
  country: { type: String, required: true, enum: ["Japan", "Taiwan", "USA", "Other"] },
  ratings: { type: [Number], required: true, default: [] },
  averageRating: { type: Number, required: true, default: 0 },
  comments: { type: [String], default: [] },
  isUniversal: { type: Boolean, default: false }, 
  image: { type: String }, 
  latitude: { type: Number, required: true }, // ✅ 緯度を追加
  longitude: { type: Number, required: true }, // ✅ 経度を追加
}, { timestamps: true });

// ✅ `ratings` の平均値を計算するメソッド（必ず `rating` は存在する前提）
ToiletSchema.methods.updateAverageRating = async function () {
  const total = this.ratings.reduce((sum, rating) => sum + rating, 0);
  this.averageRating = parseFloat((total / this.ratings.length).toFixed(1));
  await this.save();
};

export default mongoose.models.Toilet || mongoose.model("Toilet", ToiletSchema);
