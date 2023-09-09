import { Request, Response } from "express";
import { CreatedResponse, OKResponse } from "../cores/success.repsonse";
import PostService from "../services/post.service";

class PostController {
  static async getOnePost(req: Request, res: Response) {
    const postId = req.params.postId;
    new OKResponse({
      metadata: await PostService.getOnePost(postId),
    }).send(res);
  }

  static async getAllPostsOfUser(req: Request, res: Response) {
    const userId = req.params.userId;
    new OKResponse({
      metadata: await PostService.getAllPostsOfUser(userId),
    }).send(res);
  }
  static async createPost(req: Request, res: Response) {
    const userId = req.user._id;
    new CreatedResponse({
      message: "Post was created successfully!",
      metadata: await PostService.createPost({ ...req.body, userId }),
    }).send(res);
  }

  static async updatePost(req: Request, res: Response) {
    const postId = req.params.postId;
    new OKResponse({
      metadata: await PostService.updatePost(postId, req.body),
    }).send(res);
  }

  static async deletePost(req: Request, res: Response) {
    const postId = req.params.postId;
    const userId = req.user._id;
    new OKResponse({
      metadata: await PostService.deletePost(postId, userId),
    }).send(res);
  }

  static async publishPost(req: Request, res: Response) {
    // const userId = req.user._id;
    // const postId = req.params.postId;
    new OKResponse({
      metadata: await PostService.publishPost(req.body),
    }).send(res);
  }

  static async likePost(req: Request, res: Response) {
    const { userId, postId } = req.body;
    new OKResponse({
      metadata: await PostService.likePost(userId, postId),
    }).send(res);
  }

  static async unLikePost(req: Request, res: Response) {
    const { userId, postId } = req.body;
    new OKResponse({
      metadata: await PostService.unLikePost(userId, postId),
    }).send(res);
  }

  static async getUsersLikedPost(req: Request, res: Response) {
    const postId = req.params.postId;
    new OKResponse({
      metadata: await PostService.getUsersLikedPost(postId),
    }).send(res);
  }
}

export default PostController;
