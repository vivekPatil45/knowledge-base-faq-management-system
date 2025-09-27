import mongoose from "mongoose";

const searchLogSchema = new mongoose.Schema({
    keyword: { type: String, required: true }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, 
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("SearchLog", searchLogSchema);
