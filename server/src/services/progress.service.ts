import Progress from "../models/Progress";
import Lecture from "../models/Lecture";
import { Types } from "mongoose";

// Enroll in a course
export const enrollCourse = async (userId: string, courseId: string) => {
  let progress = await Progress.findOne({ userId, courseId });
  if (!progress) {
    progress = new Progress({
      userId,
      courseId,
      completedLectures: [],
      lastUnlocked: 1, // first lecture unlocked
    });
    await progress.save();
  }
  return await addProgressPercent(progress);
};

// Get all courses with progress for a user
export const getUserCourses = async (userId: string) => {
  const progresses = await Progress.find({ userId })
    .populate("courseId")
    .populate("completedLectures");

  return Promise.all(progresses.map((p) => addProgressPercent(p)));
};

// Mark lecture as completed (sequential unlock)
export const completeLecture = async (
  userId: string,
  courseId: string,
  lectureOrder: number // instead of lectureId, we use lecture order
) => {
  const progress = await Progress.findOne({ userId, courseId });
  if (!progress) throw new Error("User not enrolled in course");

  // Only allow completing the "last unlocked" lecture
  if (lectureOrder !== progress.lastUnlocked) {
    throw new Error(`You must complete lecture ${progress.lastUnlocked} first`);
  }

  // Get lecture by courseId + order
  const lecture = await Lecture.findOne({
    courseId,
    globalOrder: lectureOrder,
  });
  if (!lecture) throw new Error("Lecture not found");

  // Save completed lecture
  if (!progress.completedLectures.includes(lecture._id as Types.ObjectId)) {
    progress.completedLectures.push(lecture._id);
    progress.lastUnlocked = lectureOrder + 1; // unlock next
    progress.completedCount = progress.completedLectures.length;
    await progress.save();
  }

  return await addProgressPercent(progress);
};

// add progress percent
const addProgressPercent = async (progress: any) => {
  const totalLectures = await Lecture.countDocuments({
    courseId: progress.courseId,
  });
  const completed = progress.completedLectures.length;
  const percent =
    totalLectures > 0 ? Math.round((completed / totalLectures) * 100) : 0;

  return {
    ...progress.toObject(),
    progressPercent: percent,
    nextLecture: progress.lastUnlocked, // tells frontend which lecture is next
  };
};
