import { UserModel } from "../";

export const increasePostNumByUserId = async (userId: string) => {
  return await UserModel.updateOne(
    { _id: userId },
    {
      $inc: {
        postNum: 1,
      },
    }
  );
};

export const decreasePostNumByUserId = async (userId: string) => {
  return await UserModel.updateOne(
    { _id: userId },
    {
      $inc: {
        postNum: -1,
      },
    }
  );
};

export const increaseFollowerNumByUserId = async (userId: string) => {
  return await UserModel.updateOne(
    { _id: userId },
    {
      $inc: {
        followerNum: 1,
      },
    }
  );
};

export const decreaseFollowerNumByUserId = async (userId: string) => {
  return await UserModel.updateOne(
    { _id: userId },
    {
      $inc: {
        followerNum: -1,
      },
    }
  );
};

export const increaseFollowingNumByUserId = async (userId: string) => {
  return await UserModel.updateOne(
    { _id: userId },
    {
      $inc: {
        followingNum: 1,
      },
    }
  );
};

export const decreaseFollowingNumByUserId = async (userId: string) => {
  return await UserModel.updateOne(
    { _id: userId },
    {
      $inc: {
        followingNum: -1,
      },
    }
  );
};
