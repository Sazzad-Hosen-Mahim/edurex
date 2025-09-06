import { Response, NextFunction } from "express";
import { AuthedRequest } from "./auth";

export const requireRole =
  (role: "admin" | "user") =>
  (req: AuthedRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (role === "admin" && req.user.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
