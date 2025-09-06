import { Router } from "express";
import * as courseService from "../services/course.service";

const router = Router();

router.post("/", async (req, res) => {
  const course = await courseService.createCourse(req.body);
  res.json(course);
});

router.get("/", async (_req, res) => {
  const courses = await courseService.getAllCourses();
  res.json(courses);
});

router.get("/:id", async (req, res) => {
  const course = await courseService.getCourseById(req.params.id);
  res.json(course);
});

router.put("/:id", async (req, res) => {
  const course = await courseService.updateCourse(req.params.id, req.body);
  res.json(course);
});

router.delete("/:id", async (req, res) => {
  await courseService.deleteCourse(req.params.id);
  res.json({ success: true });
});

export default router;
