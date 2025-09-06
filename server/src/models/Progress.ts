import { Schema, model, Types } from "mongoose";

const progressSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", index: true, required: true },
    courseId: {
      type: Types.ObjectId,
      ref: "Course",
      index: true,
      required: true,
    },
    completedBitmap: { type: Buffer, required: true },
    completedCount: { type: Number, default: 0 },
    lastUnlocked: { type: Number, default: 1 },
  },
  { timestamps: true }
);

progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default model("Progress", progressSchema);
