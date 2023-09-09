import { ValidationError } from "express-validator";

class ErrorRepsonse extends Error {
  public statusCode: Number;
  public errors: ValidationError[];

  constructor(
    message: string,
    errors: ValidationError[] = [],
    statusCode: Number
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export class BadRequest extends ErrorRepsonse {
  constructor(
    message: string = "Bad Request",
    errors: ValidationError[] = [],
    statusCode = 400
  ) {
    super(message, errors, statusCode);
  }
}

export class NotFound extends ErrorRepsonse {
  constructor(
    message: string = "NotFound",
    errors: ValidationError[] = [],
    statusCode = 404
  ) {
    super(message, errors, statusCode);
  }
}

export class UnAuthorized extends ErrorRepsonse {
  constructor(
    message: string = "UnAuthorized",
    errors: ValidationError[] = [],
    statusCode = 401
  ) {
    super(message, errors, statusCode);
  }
}
