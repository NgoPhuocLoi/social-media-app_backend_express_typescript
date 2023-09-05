import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Timeline";
const COLLECTION_NAME = "timelines";

const timelineSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default model(DOCUMENT_NAME, timelineSchema);
