import { Types } from "mongoose";

export interface User {
  email: String;
  password: String;
  name: String;
  avatarUrl?: String;
  postNum?: Number;
  followerNum?: Number;
  followingNum?: Number;
}

export interface Post {
  userId: Types.ObjectId | string;
  title: string;
  slug: string;
  content: string;
  likeNum: number;
  commentNum: number;
  imageIds: Array<{ id: string; url: string }>;
  isPublished: boolean;
}

export interface Comment {
  userId: Types.ObjectId | string;
  postId: Types.ObjectId | string;
  content: string;
  parentId: Types.ObjectId | string | null;
  left: number;
  right: number;
}
