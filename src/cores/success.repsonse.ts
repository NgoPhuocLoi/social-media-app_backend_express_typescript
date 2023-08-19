import { Response } from "express";

interface SuccessParams {
  message: string;
  metadata: Object;
  statusCode: Number;
}

class SuccessResponse {
  public message: string;
  public metadata: Object;
  public statusCode: Number;

  constructor({ message, metadata, statusCode }: SuccessParams) {
    this.message = message;
    this.metadata = metadata;
    this.statusCode = statusCode;
  }

  send(res: Response) {
    res.json({
      message: this.message,
      metadata: this.metadata,
      statusCode: this.statusCode,
    });
  }
}

export class OKResponse extends SuccessResponse {
  constructor({ message = "OK", metadata = {}, statusCode = 200 }) {
    super({
      message,
      metadata,
      statusCode,
    });
  }
}

export class CreatedResponse extends SuccessResponse {
  constructor({ message = "Created!", metadata = {}, statusCode = 201 }) {
    super({
      message,
      metadata,
      statusCode,
    });
  }
}
