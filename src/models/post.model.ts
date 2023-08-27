import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Post";
const COLLECTION_NAME = "posts";

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likeNum: {
      type: Number,
      default: 0,
    },
    commentNum: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default model(DOCUMENT_NAME, postSchema);
