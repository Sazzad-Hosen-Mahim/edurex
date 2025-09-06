import { Schema, model, Types } from "mongoose";

const moduleSchema = new Schema(
  {
    courseId: {
      type: Types.ObjectId,
      ref: "Course",
      index: true,
      required: true,
    },
    title: { type: String, required: true },
    number: { type: Number, required: true },
    lectureCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

moduleSchema.index({ courseId: 1, number: 1 }, { unique: true });

export default model("Module", moduleSchema);
