import { Request, Response } from "express";
import { OKResponse } from "../cores/success.repsonse";
import UserService from "../services/user.service";

class UserController {
  static async getCurrentUser(req: Request, res: Response) {
    const userId = req.user!._id;
    new OKResponse({
      metadata: await UserService.getUserById(userId),
    }).send(res);
  }

  static async updateUserInfo(req: Request, res: Response) {
    const userId = req.params.userId;
    new OKResponse({
      message: "Update user's information successfully!",
      metadata: await UserService.updateUserInfo(userId, req.body),
    }).send(res);
  }

  static async follow(req: Request, res: Response) {
    new OKResponse({
      message: "Following successfully!",
      metadata: await UserService.follow(req.body),
    }).send(res);
  }

  static async unfollow(req: Request, res: Response) {
    new OKResponse({
      message: "Unfollowing successfully!",
      metadata: await UserService.unfollow(req.body),
    }).send(res);
  }
}

export default UserController;
