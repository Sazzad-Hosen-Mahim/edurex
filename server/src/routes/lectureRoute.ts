import { Router } from "express";
import * as lectureService from "../services/lecture.service";

const router = Router();

router.post("/:moduleId", async (req, res) => {
  const lecture = await lectureService.createLecture(
    req.params.moduleId,
    req.body
  );
  res.json(lecture);
});

router.get("/:moduleId", async (req, res) => {
  const lectures = await lectureService.getLecturesByModule(
    req.params.moduleId
  );
  res.json(lectures);
});

router.delete("/:id", async (req, res) => {
  await lectureService.deleteLecture(req.params.id);
  res.json({ success: true });
});

export default router;
