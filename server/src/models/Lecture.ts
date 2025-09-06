import { Schema, model, Types } from "mongoose";

const lectureSchema = new Schema(
  {
    courseId: {
      type: Types.ObjectId,
      ref: "Course",
      index: true,
      required: true,
    },
    moduleId: {
      type: Types.ObjectId,
      ref: "Module",
      index: true,
      required: true,
    },
    title: { type: String, index: "text", required: true },
    videoUrl: { type: String, required: true },
    pdfUrls: [{ type: String }],
    orderInModule: { type: Number, required: true },
    globalOrder: { type: Number, index: true, required: true },
  },
  { timestamps: true }
);

export default model("Lecture", lectureSchema);
