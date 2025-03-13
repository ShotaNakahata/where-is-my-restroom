import mongoose from "mongoose";

const ToiletSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  address: { type: String, required: true }, 
  rating: { type: Number, required: true, min: 1, max: 5 },  
  comments: { type: String }, 
  isUniversal: { type: Boolean, default: false }, 
  image: { type: String }, 
}, { timestamps: true });

export default mongoose.models.Toilet || mongoose.model("Toilet", ToiletSchema);

