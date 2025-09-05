import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("edurex backend is running...");
});

// Mongo connect
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
