import { Request, Response } from "express";
import { OKResponse } from "../cores/success.repsonse";
import UploadService from "../services/upload.service";

class UploadController {
  static async uploadImage(req: Request, res: Response) {
    const file = req.file;
    const postId = req.params.postId;
    new OKResponse({
      metadata: await UploadService.uploadImage(postId, file),
    }).send(res);
  }
}

export default UploadController;
