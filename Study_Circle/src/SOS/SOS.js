import mongoose from "mongoose";

const SOSSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: String, required: true },  // requester name
  tag: String,
  status: { type: String, default: "pending" }, // pending | claimed | resolved
  claimedBy: { type: String, default: null },
  messages: [
    {
      user: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model("SOS", SOSSchema);
