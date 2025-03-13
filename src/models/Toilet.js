import mongoose from "mongoose";

const ToiletSchema = new mongoose.Schema({
  name: { type: String, required: true },     
  location: { type: String, required: true },
  latitude: { type: Number, required: true }, 
  longitude: { type: Number, required: true }, 
  accessibility: { type: Boolean, default: false }, 
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
}, { timestamps: true });

export default mongoose.models.Toilet || mongoose.model("Toilet", ToiletSchema);
