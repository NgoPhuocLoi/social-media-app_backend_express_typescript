import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnAuthorized } from "../cores/error.response";

export const authentication = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) return next(new UnAuthorized("Missing Token!"));

  const token = bearerToken.split(" ")[1];

  if (!token) return next(new UnAuthorized("Invalid Token!"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error when verifying access token! Error:: " + error);
    return next(new UnAuthorized("Invalid Token!"));
  }
};
