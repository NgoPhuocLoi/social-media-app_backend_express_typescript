import {
  NextFunction,
  Request,
  Response,
  RequestHandler,
  RequestParamHandler,
} from "express";

interface HandlerParam {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

interface HandlerSignature {
  (fn: HandlerParam): RequestHandler;
}

const asyncHandler: HandlerSignature = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

export default asyncHandler;
