import { Router } from "express";
import * as authService from "../services/auth.service";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user (always role: user)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                       example: user
 *       400:
 *         description: Registration failed
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.register(email, password);
    res.json({ success: true, user });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user/admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@lms.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                       example: admin
 *       400:
 *         description: Invalid credentials
 */
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

// import { Router } from "express";
// import * as authService from "../services/auth.service";

// const router = Router();

// // Register (always role: user)
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await authService.register(email, password);
//     res.json({ success: true, user });
//   } catch (err: any) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const data = await authService.login(email, password);
//     res.json({ success: true, ...data });
//   } catch (err: any) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// export default router;
