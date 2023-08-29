import slugify from "slugify";
import { v2 as cloudinary } from "cloudinary";
import { PostModel } from "..";
import { CreatePostPayload } from "../../interfaces";
import { decreasePostNumByUserId, increasePostNumByUserId } from "./user.repo";

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
  const post = await PostModel.findById(postId).lean();

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
