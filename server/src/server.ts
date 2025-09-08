import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoute";
import courseRoutes from "./routes/courseRoute";
import moduleRoutes from "./routes/moduleRoute";
import lectureRoutes from "./routes/lectureRoute";
import progressRoutes from "./routes/progressRoute";
import { connectDB } from "./config/db";
import { seedAdmin } from "./seedAdmin";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// testing
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Edurex backend is running 🎉" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/progress", progressRoutes);

// Connect DB & start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

console.log("JWT_SECRET:", process.env.JWT_SECRET);

connectDB(MONGO_URI).then(async () => {
  await seedAdmin();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
