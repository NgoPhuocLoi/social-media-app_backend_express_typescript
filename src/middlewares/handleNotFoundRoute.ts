import { RequestHandler, RequestParamHandler } from "express";
import { NotFound } from "../cores/error.response";
const handleNotFoundRoute: RequestHandler = (req, res, next) => {
  throw new NotFound("Route not found!");
};

export default handleNotFoundRoute;
