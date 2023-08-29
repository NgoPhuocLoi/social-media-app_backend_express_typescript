import { NextFunction, Request, Response } from "express";

interface HandlerParam {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

const asyncHandler =
  (fn: HandlerParam) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => {
      console.log(err);
      next(err);
    });
  };

export default asyncHandler;
