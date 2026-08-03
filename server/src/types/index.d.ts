export interface AuthPayload {
  userId: string;
  role: string; // or the exact type your Role enum/union uses, e.g. "USER" | "ADMIN" | "MANAGER" | "OWNER"
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthPayload;
  }
}