import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Comment";
const COLLECTION_NAME = "comments";

const commentSchema = new Schema(
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
    content: {
      type: String,
      required: true,
    },

    parentId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    left: {
      type: Number,
      required: true,
    },
    right: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default model(DOCUMENT_NAME, commentSchema);
