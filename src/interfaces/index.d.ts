import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export * from "./services/post";

declare global {
  namespace Express {
    export interface Request {
      user?: string | JwtPayload<{ _id: string; email: string }>;
    }
  }
}
