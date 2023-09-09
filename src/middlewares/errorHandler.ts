import { RequestHandler, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const message = error.message || "Internal Server Error";
  const statusCode = error.statusCode || 500;
  const errors = error.errors;
  res.status(statusCode).json({
    message,
    statusCode,
    errors,
  });
};

export default errorHandler;
