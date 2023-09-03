import { User } from "../interfaces/model";
import { BadRequest, UnAuthorized } from "../cores/error.response";
import { UserModel } from "../models";
import * as argon2 from "argon2";
import { generateTokenPair } from "../utils/auth";

interface RegisterParams extends User {}
interface LoginParams {
  email: string;
  password: string;
}

class AuthService {
  static async register(payload: RegisterParams) {
    const { email, password } = payload;

    const foundUser = await UserModel.findOne({ email }).lean();

    if (foundUser) throw new BadRequest("Email has already been used!");

    const user = await UserModel.create(payload);

    const tokens = generateTokenPair({
      email,
      _id: user._id,
    });

    return { user, tokens };
  }

  static async login(payload: LoginParams) {
    const { email, password } = payload;

    const foundUser = await UserModel.findOne({ email }).lean();

    if (!foundUser) throw new UnAuthorized("Incorrect email or password[1]!");

    const passwordMatched = await argon2.verify(foundUser.password, password);

    if (!passwordMatched)
      throw new UnAuthorized("Incorrect email or password[2]!");

    const tokens = generateTokenPair({
      email,
      _id: foundUser._id,
    });
    return { user: { ...foundUser, password: undefined }, tokens };
  }
}

export default AuthService;
