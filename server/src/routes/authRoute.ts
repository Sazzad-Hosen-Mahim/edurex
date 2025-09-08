import { Router } from "express";
import * as authService from "../services/auth.service";

const router = Router();

// Register (always role: user)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.register(email, password);
    res.json({ success: true, user });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json({ success: true, ...data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
