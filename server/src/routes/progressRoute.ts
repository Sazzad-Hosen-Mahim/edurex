import { Router } from "express";
import * as progressService from "../services/progress.service";

const router = Router();

router.post("/complete/:lectureId", async (req, res) => {
  const progress = await progressService.markLectureComplete(
    req.body.userId,
    req.params.lectureId
  );
  res.json(progress);
});

router.get("/:userId", async (req, res) => {
  const progress = await progressService.getUserProgress(req.params.userId);
  res.json(progress);
});

export default router;
