import { Request, Response, NextFunction } from "express";
export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user.email !== "manish.n.gond@gmail.com") {
    return res.status(403).json({ error: "Forbidden: Admin access required" });
  }
  next();
};
