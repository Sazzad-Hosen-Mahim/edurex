import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodTypeAny } from "zod";

export const validate =
  (schema: ZodObject<any> | ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = req.method === "GET" ? req.query : req.body;
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    if (req.method !== "GET") {
      (req as any).body = parsed.data;
    }

    next();
  };
