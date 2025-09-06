import { Schema, model, Types } from "mongoose";

const courseSchema = new Schema(
  {
    title: { type: String, index: "text", required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    moduleCount: { type: Number, default: 0 },
    lectureCount: { type: Number, default: 0 },
    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Course", courseSchema);
