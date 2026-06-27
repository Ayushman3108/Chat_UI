import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    text: { type: String, required: true },
    sender: { type: String, enum: ["user", "bot"], required: true,},
}, {timestamps: true,});
export default mongoose.model("Chat", chatSchema);