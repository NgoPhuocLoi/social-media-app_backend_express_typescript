import { BadRequest } from "../cores/error.response";
import { CreatePostPayload, UpdatePostPayload } from "../interfaces";
import { PostModel } from "../models";
import * as postRepo from "../models/repositories/post.repo";

class PostService {
  static async createPost(payload: CreatePostPayload) {
    const newPost = await postRepo.createNewPost(payload);

    return { post: newPost };
  }

  static async updatePost(postId: string, payload: UpdatePostPayload) {
    const updatedPost = await PostModel.findByIdAndUpdate(postId, payload, {
      new: true,
    }).lean();
    if (!updatedPost) throw new BadRequest("Post was not existed!");
    return { post: updatedPost };
  }

  static async deletePost(postId: string, userId: string) {
    const deletedPost = await postRepo.deletePost(postId, userId);
    if (!deletedPost) throw new BadRequest("Post was not existed!");

    return { post: deletedPost };
  }

  static async getOnePost(postId: string) {
    const post = await postRepo.getPostById(postId);
    if (!post) throw new BadRequest("Post was not existed!");
    return { post };
  }

  static async getAllPostsOfUser(userId: string) {
    const posts = await PostModel.find({
      userId,
    }).lean();

    return { posts };
  }

  static async likePost() {}

  static async unLikePost() {}
}

export default PostService;
