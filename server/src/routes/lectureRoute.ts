import { Router } from "express";
import * as lectureService from "../services/lecture.service";
import { authMiddleware, roleMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/:moduleId", async (req, res) => {
  const lectures = await lectureService.getLecturesByModule(
    req.params.moduleId
  );
  res.json(lectures);
});

router.post(
  "/:moduleId",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    const lecture = await lectureService.createLecture(
      req.params.moduleId,
      req.body
    );
    res.json(lecture);
  }
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    const lecture = await lectureService.updateLecture(req.params.id, req.body);
    res.json(lecture);
  }
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    await lectureService.deleteLecture(req.params.id);
    res.json({ success: true });
  }
);

export default router;
