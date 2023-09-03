import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "UserLikePost";
const COLLECTION_NAME = "userLikePosts";

const userLikePostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const userLikePostModel = model(DOCUMENT_NAME, userLikePostSchema);

export default userLikePostModel;
