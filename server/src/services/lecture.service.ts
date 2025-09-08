import Lecture from "../models/Lecture";
import Module from "../models/Module";

export const createLecture = async (moduleId: string, data: any) => {
  const module = await Module.findById(moduleId);
  if (!module) throw new Error("Module not found");
  const lecture = new Lecture({
    ...data,
    moduleId: module._id,
    courseId: module.courseId,
  });
  await lecture.save();

  await Module.findByIdAndUpdate(moduleId, {
    $push: { lectures: lecture._id },
  });
  return lecture;
};

export const getLecturesByModule = async (moduleId: string) => {
  return await Lecture.find({ module: moduleId });
};

export const updateLecture = async (id: string, data: any) => {
  return await Lecture.findByIdAndUpdate(id, data, { new: true });
};

export const deleteLecture = async (id: string) => {
  return await Lecture.findByIdAndDelete(id);
};
