import { Schema, model, InferSchemaType } from "mongoose";

const progressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      index: true,
      required: true,
    },
    completedLectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
    lastUnlocked: { type: Number, default: 1 },
    completedCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

type ProgressDoc = InferSchemaType<typeof progressSchema>;

export default model<ProgressDoc>("Progress", progressSchema);
