import Course from "../models/Course";

export const createCourse = async (data: any) => {
  const course = new Course(data);
  return await course.save();
};

export const getAllCourses = async () => {
  return await Course.find();
};

export const getCourseById = async (id: string) => {
  return await Course.findById(id).populate("modules");
};

export const updateCourse = async (id: string, data: any) => {
  return await Course.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCourse = async (id: string) => {
  return await Course.findByIdAndDelete(id);
};
