import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { CreatedResponse, OKResponse } from "../cores/success.repsonse";

class AuthController {
  static async register(req: Request, res: Response) {
    new CreatedResponse({
      message: "Register successfully!",
      metadata: await AuthService.register(req.body),
    }).send(res);
  }

  static async login(req: Request, res: Response) {
    new OKResponse({
      message: "Login successfully!",
      metadata: await AuthService.login(req.body),
    }).send(res);
  }
}

export default AuthController;
