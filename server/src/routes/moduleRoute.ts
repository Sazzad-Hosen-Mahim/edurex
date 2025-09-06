import { Router } from "express";
import * as moduleService from "../services/module.service";

const router = Router();

router.post("/:courseId", async (req, res) => {
  const module = await moduleService.createModule(
    req.params.courseId,
    req.body
  );
  res.json(module);
});

router.get("/:courseId", async (req, res) => {
  const modules = await moduleService.getModulesByCourse(req.params.courseId);
  res.json(modules);
});

router.delete("/:id", async (req, res) => {
  await moduleService.deleteModule(req.params.id);
  res.json({ success: true });
});

export default router;
