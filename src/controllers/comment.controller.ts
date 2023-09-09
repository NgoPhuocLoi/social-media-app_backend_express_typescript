import { Request, Response } from "express";
import { CreatedResponse, OKResponse } from "../cores/success.repsonse";
import CommentService from "../services/comment.service";

class CommentController {
  static async createComment(req: Request, res: Response) {
    new CreatedResponse({
      metadata: await CommentService.createComment(req.body),
    }).send(res);
  }

  static async getCommentsOfPostFromParent(req: Request, res: Response) {
    const postId = req.query.postId as string;
    const parentId = req.query.parentId as string;
    new OKResponse({
      metadata: await CommentService.getCommentOfPostFromParentId({
        postId,
        parentId,
      }),
    }).send(res);
  }

  static async deleteComment(req: Request, res: Response) {
    new OKResponse({
      metadata: await CommentService.deleteComment(req.body),
    }).send(res);
  }
}

export default CommentController;
