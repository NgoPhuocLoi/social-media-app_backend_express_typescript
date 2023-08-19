class ErrorRepsonse extends Error {
  public statusCode: Number;

  constructor(message: string, statusCode: Number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends ErrorRepsonse {
  constructor(message: string = "Bad Request", statusCode = 400) {
    super(message, statusCode);
  }
}

export class NotFound extends ErrorRepsonse {
  constructor(message: string = "NotFound", statusCode = 404) {
    super(message, statusCode);
  }
}

export class UnAuthorized extends ErrorRepsonse {
  constructor(message: string = "UnAuthorized", statusCode = 401) {
    super(message, statusCode);
  }
}
