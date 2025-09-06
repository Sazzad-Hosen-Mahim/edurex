import Lecture from "../models/Lecture";
import Module from "../models/Module";

export const createLecture = async (moduleId: string, data: any) => {
  const lecture = new Lecture({ ...data, module: moduleId });
  await lecture.save();

  await Module.findByIdAndUpdate(moduleId, {
    $push: { lectures: lecture._id },
  });
  return lecture;
};

export const getLecturesByModule = async (moduleId: string) => {
  return await Lecture.find({ module: moduleId });
};

export const deleteLecture = async (id: string) => {
  return await Lecture.findByIdAndDelete(id);
};
