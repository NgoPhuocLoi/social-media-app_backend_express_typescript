import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Follow";
const COLLECTION_NAME = "follows";

const followSchema = new Schema(
  {
    followerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followingId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const followModel = model(DOCUMENT_NAME, followSchema);

export default followModel;
