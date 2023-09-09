import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { BadRequest } from "../cores/error.response";

export const validation = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  return next(new BadRequest("Validation Error!", result.array()));
};
