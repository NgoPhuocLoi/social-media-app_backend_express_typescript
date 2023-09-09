import { Types } from "mongoose";
import { NotFound } from "../cores/error.response";
import { Comment } from "../interfaces/model";
import { CommentModel, UserModel } from "../models";
import * as commentRepo from "../models/repositories/comment.repo";
import {
  getPostById,
  increaseCommentNumOfPostBy,
} from "../models/repositories/post.repo";

type CreateCommentPayload = Pick<
  Comment,
  "userId" | "postId" | "content" | "parentId"
>;

type GetCommentPayload = Pick<Comment, "postId" | "parentId">;

type DeleteCommentPayload = {
  postId: Types.ObjectId | string;
  commentId: Types.ObjectId | string;
};

class CommentService {
  static async createComment(payload: CreateCommentPayload) {
    const { userId, content, parentId, postId } = payload;
    const [user, post] = await Promise.all([
      UserModel.findById(userId).lean(),
      getPostById(postId),
    ]);
    if (!user) throw new NotFound("User not found!");
    if (!post) throw new NotFound("Post not found!");

    let maxRightVal;

    if (parentId) {
      const parentComment = await CommentModel.findById(parentId).lean();
      if (!parentComment) throw new NotFound("Parent comment not found!");

      const rightOfParent = parentComment.right;

      await Promise.all([
        commentRepo.increaseRightValueOfCommentsHaveRightGTEValueBy(
          postId,
          rightOfParent,
          2
        ),
        commentRepo.increaseLeftValueOfCommentsHaveLeftGTValueBy(
          postId,
          rightOfParent,
          2
        ),
      ]);

      maxRightVal = rightOfParent;
    } else {
      maxRightVal = await commentRepo.findMaxRightValue(postId);
    }

    const comment = await CommentModel.create({
      userId,
      postId,
      content,
      parentId,
      left: maxRightVal,
      right: maxRightVal + 1,
    });

    await increaseCommentNumOfPostBy(postId, 1);

    return { comment };
  }

  static async getCommentOfPostFromParentId(payload: GetCommentPayload) {
    const { postId, parentId } = payload;
    const post = await getPostById(postId);
    if (!post) throw new NotFound("Post not found!");

    const query: {
      postId: Types.ObjectId | string;
      left?: {};
      right?: {};
    } = {
      postId,
    };

    if (parentId) {
      const parentComment = await CommentModel.findById(parentId).lean();
      if (!parentComment) throw new NotFound("Parent comment not found!");

      query.left = {
        $gte: parentComment.left,
      };

      query.right = {
        $lt: parentComment.right,
      };
    }
    const comments = await CommentModel.find(query).lean();

    return { comments };
  }

  // delete All comment when deleting its post
  static async deleteComment(payload: DeleteCommentPayload) {
    const { postId, commentId } = payload;

    const post = await getPostById(postId);
    if (!post) throw new NotFound("Post not found!");

    const comment = await CommentModel.findById(commentId).lean();
    if (!comment) throw new NotFound("Comment not found!");

    const width = comment.right - comment.left + 1;

    const result = await CommentModel.deleteMany({
      postId,
      left: {
        $gte: comment.left,
        $lte: comment.right,
      },
    });

    await commentRepo.increaseRightValueOfCommentsHaveRightGTEValueBy(
      postId,
      comment.right + 1,
      -width
    );
    await commentRepo.increaseLeftValueOfCommentsHaveLeftGTValueBy(
      postId,
      comment.right,
      -width
    );

    await increaseCommentNumOfPostBy(postId, -result.deletedCount);

    return result;
  }
}

export default CommentService;
