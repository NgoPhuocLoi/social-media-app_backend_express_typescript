import { NotFound } from "../cores/error.response";
import { UserModel } from "../models";

interface UpdateUserInfoParams {
  name?: string;
  avatarUrl?: string;
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
}

export default UserService;
