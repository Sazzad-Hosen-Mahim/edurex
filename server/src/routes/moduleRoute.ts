import { Router } from "express";
import * as moduleService from "../services/module.service";
import { authMiddleware, roleMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/:courseId", async (req, res) => {
  const modules = await moduleService.getModulesByCourse(req.params.courseId);
  res.json(modules);
});

router.post(
  "/:courseId",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    const module = await moduleService.createModule(
      req.params.courseId,
      req.body
    );
    res.json(module);
  }
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    await moduleService.deleteModule(req.params.id);
    res.json({ success: true });
  }
);

export default router;
