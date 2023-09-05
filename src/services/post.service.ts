import { Types } from "mongoose";
import { BadRequest } from "../cores/error.response";
import {
  CreatePostPayload,
  PublishPostPayload,
  UpdatePostPayload,
} from "../interfaces";
import {
  PostModel,
  TimelineModel,
  UserLikePostModel,
  UserModel,
} from "../models";
import * as postRepo from "../models/repositories/post.repo";
import * as followRepo from "../models/repositories/follow.repo";
import * as timelineRepo from "../models/repositories/timeline.repo";
import { extractLinksFromContent } from "../utils";

class PostService {
  static async createPost(payload: CreatePostPayload) {
    const newPost = await postRepo.createNewPost(payload);

    return { post: newPost };
  }

  static async updatePost(
    postId: string | Types.ObjectId,
    payload: UpdatePostPayload
  ) {
    const updatedPost = await PostModel.findByIdAndUpdate(postId, payload, {
      new: true,
    }).lean();
    if (!updatedPost) throw new BadRequest("Post was not existed!");
    return { post: updatedPost };
  }

  static async deletePost(postId: string, userId: string) {
    const deletedPost = await postRepo.deletePost(postId, userId);
    if (!deletedPost) throw new BadRequest("Post was not existed!");
    if (deletedPost.isPublished) {
      // delete the timeline of followers
      await TimelineModel.deleteMany({
        postId: deletedPost._id,
      });
    }
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

  static async publishPost(payload: PublishPostPayload) {
    // check and delete all images did'nt use in the imageIds before delete popst
    let { postId, title, content } = payload;

    const post = await PostModel.findById(postId);
    if (!post) throw new BadRequest("Post not found!");
    if (post.isPublished)
      throw new BadRequest("This post has already been published!");
    if (!title) title = post.title;
    if (!content) content = post.content;
    const linksInContent = extractLinksFromContent(content);

    const publishedPost = await this.updatePost(post._id, {
      title,
      content,
      isPublished: true,
    });

    await postRepo.deleteNotUsedImages(post, linksInContent);
    await timelineRepo.createTimelineForFollowersOfUser(post._id, post.userId!);

    // return { post: publishedPost };
    return { post: publishedPost };
  }

  static async likePost(userId: string, postId: string) {
    let userLikePost = await postRepo.isUserLikePost(userId, postId);
    if (userLikePost)
      throw new BadRequest("This user has already liked this post!");

    userLikePost = await UserLikePostModel.create({
      userId,
      postId,
    });

    if (userLikePost) {
      await postRepo.incresePostLikeNum(postId);
    }

    return userLikePost;
  }

  static async unLikePost(userId: string, postId: string) {
    let userLikePost = await postRepo.isUserLikePost(userId, postId);
    if (!userLikePost)
      throw new BadRequest("This user has not liked this post!");

    const deleted = await UserLikePostModel.deleteOne({
      _id: userLikePost._id,
    });

    if (deleted.deletedCount) {
      await postRepo.decreasePostLikeNum(postId);
    }

    return deleted;
  }

  static async getUsersLikedPost(postId: string) {
    const results = await UserLikePostModel.find({ postId })
      .populate("userId", "name email avatarUrl")
      .lean();
    return { users: results.map((r) => r.userId) };
  }
}

export default PostService;
