import argon2 from "argon2";
import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "users";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatarUrl: { type: String },
    postNum: { type: Number, default: 0 },
    followerNum: { type: Number, default: 0 },
    followingNum: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashedPass = await argon2.hash(this.password);
    this.password = hashedPass;
  } catch (error) {
    console.log("Error when hashing user's password! Error :: " + error);
  }
});

const userModel = model(DOCUMENT_NAME, userSchema);
export default userModel;
