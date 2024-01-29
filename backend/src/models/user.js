import mongoose from "mongoose";

const coinTossResultSchema = mongoose.Schema({
  outcome: { type: String, enum: ["Heads", "Tails"], required: true },
  won: { type: Boolean, required: true },
});

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  tokens: { type: Number, required: true },
  coinTossResults: [coinTossResultSchema],
});

export default mongoose.model("User", userSchema);
