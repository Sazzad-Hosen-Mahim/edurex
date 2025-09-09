import Progress from "../models/Progress";
import Lecture from "../models/Lecture";
import { Types } from "mongoose";
import Module from "../models/Module";
import Course from "../models/Course";

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
// export const getUserCourses = async (userId: string) => {
//   const progresses = await Progress.find({ userId })
//     .populate("courseId")
//     .populate("completedLectures");

//   return Promise.all(progresses.map((p) => addProgressPercent(p)));
// };

export const getUserCourses = async (userId: string) => {
  const progresses = await Progress.find({ userId }).populate(
    "completedLectures"
  );

  const results = [];

  for (const p of progresses) {
    const course = await Course.findById(p.courseId);
    if (!course) continue;

    const modules = await Module.find({ courseId: course._id });

    // Fetch lectures for each module
    const modulesWithLectures = await Promise.all(
      modules.map(async (mod) => {
        const lectures = await Lecture.find({ moduleId: mod._id });
        return { ...mod.toObject(), lectures };
      })
    );

    const progressWithModules = {
      ...p.toObject(),
      courseId: { ...course.toObject(), modules: modulesWithLectures },
    };

    results.push(await addProgressPercent(progressWithModules));
  }

  return results;
};

export const completeLecture = async (
  userId: string,
  courseId: string,
  lectureOrder: number
) => {
  const progress = await Progress.findOne({ userId, courseId });
  if (!progress) throw new Error("User not enrolled in course");

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
    progress.lastUnlocked = lectureOrder + 1;
    progress.completedCount = progress.completedLectures.length;
    await progress.save();
  }

  return await addProgressPercent(progress);
};

// add progress percent
const addProgressPercent = async (progress: any) => {
  const totalLectures = await Lecture.countDocuments({
    courseId: progress.courseId._id || progress.courseId,
  });
  const completed = progress.completedLectures.length;
  const percent =
    totalLectures > 0 ? Math.round((completed / totalLectures) * 100) : 0;

  return {
    ...progress,
    progressPercent: percent,
    nextLecture: progress.lastUnlocked,
  };
};
