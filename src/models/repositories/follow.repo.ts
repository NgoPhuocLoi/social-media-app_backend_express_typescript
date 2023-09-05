import { Types } from "mongoose";
import { FollowModel } from "..";

export const getFollowersOfUser = async (userId: string | Types.ObjectId) => {
  return await FollowModel.find({ followingId: userId })
    .select("followerId")
    .lean();
};

export const getFollowingsOfUser = async (userId: string | Types.ObjectId) => {
  return await FollowModel.find({ followerId: userId })
    .select("followingId")
    .lean();
};
