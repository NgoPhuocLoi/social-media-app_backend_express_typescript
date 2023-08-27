import { Request, Response } from "express";
import { OKResponse } from "../cores/success.repsonse";
import UploadService from "../services/upload.service";

class UploadController {
  static async uploadImage(req: Request, res: Response) {
    console.log(req.body);
    new OKResponse({
      metadata: await UploadService.uploadImage(req.body.fileBase64),
    }).send(res);
  }
}

export default UploadController;
