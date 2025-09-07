import { Router } from "express";
import * as progressService from "../services/progress.service";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Enroll in course
router.post("/enroll/:courseId", authMiddleware, async (req, res) => {
  try {
    const progress = await progressService.enrollCourse(
      (req as any).user.id,
      req.params.courseId
    );
    res.json({ success: true, progress });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get all my courses with progress
router.get("/my-courses", authMiddleware, async (req, res) => {
  try {
    const courses = await progressService.getUserCourses((req as any).user.id);
    res.json({ success: true, courses });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Mark lecture as complete
router.post(
  "/:courseId/complete/:lectureId",
  authMiddleware,
  async (req, res) => {
    try {
      const progress = await progressService.completeLecture(
        (req as any).user.id,
        req.params.courseId,
        parseInt(req.params.lectureId, 10)
      );
      res.json({ success: true, progress });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
);

export default router;
