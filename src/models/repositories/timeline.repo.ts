import { TimelineModel } from "..";
import * as followRepo from "./follow.repo";
import { Types } from "mongoose";

export const createTimelineForFollowersOfUser = async (
  postId: string | Types.ObjectId,
  userId: string | Types.ObjectId
) => {
  const followers = await followRepo.getFollowersOfUser(userId);

  const promiseArr = followers.map(async (follower) =>
    TimelineModel.create({
      userId: follower.followerId,
      postId,
    })
  );

  promiseArr.push(
    TimelineModel.create({
      userId,
      postId,
    })
  );

  return await Promise.all(promiseArr);
};

export const getTimelineOfUser = async (
  userId: string,
  skip: number,
  limit: number
) => {
  return await TimelineModel.find({ userId })
    .sort({ createdAt: -1, _id: 1 })
    .skip(skip)
    .limit(limit)
    .populate("postId", "-_id -userId -imageIds")
    .lean();
};
