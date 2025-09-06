import Progress from "../models/Progress";

export const markLectureComplete = async (
  userId: string,
  lectureId: string
) => {
  let progress = await Progress.findOne({ user: userId });
  if (!progress)
    progress = new Progress({ user: userId, completedLectures: [] });

  if (!progress.completedLectures.includes(lectureId)) {
    progress.completedLectures.push(lectureId);
  }

  return await progress.save();
};

export const getUserProgress = async (userId: string) => {
  return await Progress.findOne({ user: userId }).populate("completedLectures");
};
