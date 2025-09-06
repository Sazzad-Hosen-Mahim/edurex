import { Router } from "express";
import * as progressService from "../services/progress.service";

const router = Router();

// Mark a lecture complete
router.post("/complete/:courseId/:lectureIndex", async (req, res) => {
  try {
    const { userId } = req.body;
    const { courseId, lectureIndex } = req.params;

    const progress = await progressService.markLectureComplete(
      userId,
      courseId,
      parseInt(lectureIndex, 10) // convert string to number
    );

    res.json(progress);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get user progress for a course
router.get("/:userId/:courseId", async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const progress = await progressService.getUserProgress(userId, courseId);

    res.json(progress);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
