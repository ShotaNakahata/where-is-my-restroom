import mongoose from "mongoose";

const ToiletSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  address: { type: String, required: true }, 
  ratings: { type: [Number], required: true, default: [] }, // ✅ `rating` は必須
  averageRating: { type: Number, required: true, default: 0 }, // ✅ `ratings` の平均値
  comments: { type: [String], default: [] }, // ✅ `comments` は単純な文字列配列
  isUniversal: { type: Boolean, default: false }, 
  image: { type: String }, 
}, { timestamps: true });

// ✅ `ratings` の平均値を計算するメソッド（必ず `rating` は存在する前提）
ToiletSchema.methods.updateAverageRating = async function () {
  const total = this.ratings.reduce((sum, rating) => sum + rating, 0);
  this.averageRating = total / this.ratings.length;
  await this.save();
};

export default mongoose.models.Toilet || mongoose.model("Toilet", ToiletSchema);
