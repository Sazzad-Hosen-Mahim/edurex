import Progress from "../models/Progress";
import { Types } from "mongoose";

export const markLectureComplete = async (
  userId: string,
  courseId: string,
  lectureIndex: number // lecture number in course (1-based index)
) => {
  let progress = await Progress.findOne({ userId, courseId });

  if (!progress) {
    // Each bit = lecture. Let's assume max 1024 lectures for now.
    const buffer = Buffer.alloc(128); // 128 bytes = 1024 bits
    progress = new Progress({
      userId,
      courseId,
      completedBitmap: buffer,
      completedCount: 0,
      lastUnlocked: 1,
    });
  }

  const byteIndex = Math.floor((lectureIndex - 1) / 8);
  const bitIndex = (lectureIndex - 1) % 8;

  // Set bit in bitmap
  if ((progress.completedBitmap[byteIndex] & (1 << bitIndex)) === 0) {
    progress.completedBitmap[byteIndex] |= 1 << bitIndex;
    progress.completedCount += 1;
    progress.lastUnlocked = Math.max(progress.lastUnlocked, lectureIndex + 1);
  }

  return await progress.save();
};

export const getUserProgress = async (userId: string, courseId: string) => {
  return await Progress.findOne({ userId, courseId });
};
