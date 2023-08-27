import { PostModel } from "..";
import { CreatePostPayload } from "../../interfaces";
import { decreasePostNumByUserId, increasePostNumByUserId } from "./user.repo";
import slugify from "slugify";

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
  const deletedPost: any = await PostModel.findByIdAndDelete(postId).lean();
  if (deletedPost) {
    await decreasePostNumByUserId(userId);
  }

  return deletedPost;
};

export const getPostById = async (postId: string) => {
  return await PostModel.findById(postId)
    .populate("userId", "-password -createdAt -updatedAt")
    .lean();
};
