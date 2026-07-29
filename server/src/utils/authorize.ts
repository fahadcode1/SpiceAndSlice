// middlewares/authorize.ts
import { Request, Response, NextFunction } from "express";
import { hasPermission, Permission, Role } from "./permissions";

export function authorize(permission: Permission) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || typeof req.user === "string") {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const role = req.user.role as Role;

    if (!hasPermission(role, permission)) {
      return res.status(403).json({ message: "Forbidden — insufficient permission" });
    }

    next();
  };
}