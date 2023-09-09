import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import CommentController from "../../controllers/comment.controller";
import { authentication } from "../../middlewares/auth";
import { body, param, query } from "express-validator";
import mongoose from "mongoose";
import { validation } from "../../middlewares/validation";
const router = express.Router();

router.use(authentication);
router.post(
  "/create",
  body("postId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  body("userId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  body("parentId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  body("content").isString().isEmpty(),
  validation,
  asyncHandler(CommentController.createComment)
);
router.get(
  "/",
  query("postId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  query("parentId")
    .custom((value) => {
      if (!value) return true;
      return mongoose.isValidObjectId(value);
    })
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(CommentController.getCommentsOfPostFromParent)
);
router.delete(
  "/",
  body("postId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  body("commentId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(CommentController.deleteComment)
);

export default router;
