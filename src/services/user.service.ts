import { BadRequest, NotFound } from "../cores/error.response";
import { UserModel, FollowModel, PostModel, TimelineModel } from "../models";
import * as userRepo from "../models/repositories/user.repo";

interface UpdateUserInfoParams {
  name?: string;
  avatarUrl?: string;
}

interface FollowParams {
  fromUserId: string;
  toUserId: string;
}

class UserService {
  static async getUserById(userId: string) {
    const user = await UserModel.findById(userId).select("-password").lean();
    return { user: { ...user, password: undefined } };
  }

  static async updateUserInfo(userId: string, payload: UpdateUserInfoParams) {
    const user = await UserModel.findByIdAndUpdate(userId, payload, {
      new: true,
    }).lean();

    if (!user) throw new NotFound(`User with ID ${userId} was not existed!`);

    return { user: { ...user, password: undefined } };
  }

  static async follow({ fromUserId, toUserId }: FollowParams) {
    if (fromUserId === toUserId)
      throw new BadRequest("Can not follow yourself!");
    const arr = await Promise.all([
      UserModel.findById(fromUserId).lean(),
      UserModel.findById(toUserId).lean(),
    ]);

    if (!arr[0] || !arr[1]) throw new NotFound("User not found!");

    const followFound = await FollowModel.findOne({
      followerId: fromUserId,
      followingId: toUserId,
    }).lean();

    if (followFound) throw new BadRequest("User has already been followed!");

    const result = await Promise.all([
      FollowModel.create({
        followerId: fromUserId,
        followingId: toUserId,
      }),
      userRepo.increaseFollowingNumByUserId(fromUserId),
      userRepo.increaseFollowerNumByUserId(toUserId),
    ]);

    const followingPosts = await PostModel.find({ userId: toUserId }).lean();

    await Promise.all(
      followingPosts.map(async (post) => {
        return TimelineModel.create({
          userId: fromUserId,
          postId: post._id,
        });
      })
    );

    return { follow: result[0] };
  }

  static async unfollow({ fromUserId, toUserId }: FollowParams) {
    const arr = await Promise.all([
      UserModel.findById(fromUserId).lean(),
      UserModel.findById(toUserId).lean(),
    ]);

    if (!arr[0] || !arr[1]) throw new NotFound("User not found!");

    const followFound = await FollowModel.findOne({
      followerId: fromUserId,
      followingId: toUserId,
    });

    if (!followFound) throw new BadRequest("User has not been followed!");

    const result = await Promise.all([
      followFound.deleteOne(),
      userRepo.decreaseFollowingNumByUserId(fromUserId),
      userRepo.decreaseFollowerNumByUserId(toUserId),
    ]);

    const followingPosts = await PostModel.find({ userId: toUserId }).lean();

    await Promise.all(
      followingPosts.map(async (post) => {
        return TimelineModel.deleteOne({
          userId: fromUserId,
          postId: post._id,
        });
      })
    );

    return result[0];
  }
}

export default UserService;
