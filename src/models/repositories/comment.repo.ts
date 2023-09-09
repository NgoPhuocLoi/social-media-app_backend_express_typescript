import { Types } from "mongoose";
import { CommentModel } from "..";

export const increaseRightValueOfCommentsHaveRightGTEValueBy = async (
  postId: Types.ObjectId | string,
  value: number,
  by: number
) => {
  return await CommentModel.updateMany(
    {
      postId,
      right: {
        $gte: value,
      },
    },
    {
      $inc: {
        right: by,
      },
    }
  );
};

export const increaseLeftValueOfCommentsHaveLeftGTValueBy = async (
  postId: Types.ObjectId | string,
  value: number,
  by: number
) => {
  return await CommentModel.updateMany(
    {
      postId,
      left: {
        $gt: value,
      },
    },
    {
      $inc: {
        left: by,
      },
    }
  );
};

export const findMaxRightValue = async (postId: Types.ObjectId | string) => {
  const commentWithMaxRightVal = await CommentModel.findOne({ postId })
    .sort({ right: -1 })
    .lean();
  return commentWithMaxRightVal ? commentWithMaxRightVal.right : 1;
};
