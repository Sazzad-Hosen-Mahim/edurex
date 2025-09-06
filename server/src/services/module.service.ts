import Module from "../models/Module";
import Course from "../models/Course";

export const createModule = async (courseId: string, data: any) => {
  const count = await Module.countDocuments({ course: courseId });
  const module = new Module({
    ...data,
    moduleNumber: count + 1,
    course: courseId,
  });
  await module.save();

  await Course.findByIdAndUpdate(courseId, { $push: { modules: module._id } });
  return module;
};

export const getModulesByCourse = async (courseId: string) => {
  return await Module.find({ course: courseId }).populate("lectures");
};

export const deleteModule = async (id: string) => {
  return await Module.findByIdAndDelete(id);
};
