import { Router } from "express";
import * as courseService from "../services/course.service";
import { authMiddleware, roleMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const courses = await courseService.getAllCourses();
  res.json(courses);
});

router.get("/:id", async (req, res) => {
  const course = await courseService.getCourseById(req.params.id);
  res.json(course);
});

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    const course = await courseService.createCourse(req.body);
    res.json(course);
  }
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    const course = await courseService.updateCourse(req.params.id, req.body);
    res.json(course);
  }
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    await courseService.deleteCourse(req.params.id);
    res.json({ success: true });
  }
);

export default router;
