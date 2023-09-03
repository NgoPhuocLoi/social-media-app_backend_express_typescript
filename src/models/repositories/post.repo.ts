import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";
import { PostModel, UserModel, UserLikePostModel } from "..";
import { CreatePostPayload } from "../../interfaces";
import UploadService from "../../services/upload.service";
import { decreasePostNumByUserId, increasePostNumByUserId } from "./user.repo";
import { BadRequest } from "../../cores/error.response";

export const createNewPost = async (payload: CreatePostPayload) => {
  const newPost = await PostModel.create({
    ...payload,
    slug: slugify(payload.title + "-" + new Date().getTime(), {
      lower: true,
    }),
  });

  if (newPost) {
    await increasePostNumByUserId(payload.userId);
  }

  return newPost;
};

export const deletePost = async (postId: string, userId: string) => {
  const post = await PostModel.findByIdAndDelete(postId).lean();

  if (post) {
    await decreasePostNumByUserId(userId);
    for (let image of post.imageIds) {
      await cloudinary.uploader.destroy(image.id);
    }
  }

  return post;
};

export const getPostById = async (postId: string) => {
  return await PostModel.findById(postId)
    .populate("userId", "-password -createdAt -updatedAt")
    .lean();
};

export const deleteNotUsedImages = async (
  post: any,
  linksInContent: string[]
) => {
  for (let { url, id } of post.imageIds) {
    if (!linksInContent.includes(url)) {
      await Promise.all([
        UploadService.destroyImage(id),
        post.updateOne({
          $pull: {
            imageIds: { url, id },
          },
        }),
      ]);
    }
  }
};

export const isUserLikePost = async (userId: string, postId: string) => {
  const [user, post, userLikePost] = await Promise.all([
    UserModel.findById(userId).lean(),
    PostModel.findById(postId).lean(),
    UserLikePostModel.findOne({ userId, postId }).lean(),
  ]);

  if (!user) throw new BadRequest("User not found!");
  if (!post) throw new BadRequest("Post not found!");

  return userLikePost;
};

export const incresePostLikeNum = async (postId: string) => {
  return await PostModel.findByIdAndUpdate(postId, {
    $inc: {
      likeNum: 1,
    },
  });
};

export const decreasePostLikeNum = async (postId: string) => {
  return await PostModel.findByIdAndUpdate(postId, {
    $inc: {
      likeNum: -1,
    },
  });
};
