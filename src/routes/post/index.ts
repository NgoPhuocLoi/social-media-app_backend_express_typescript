import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import PostController from "../../controllers/post.controller";
import { authentication } from "../../middlewares/auth";
import { body, param } from "express-validator";
import mongoose from "mongoose";
import { validation } from "../../middlewares/validation";
const router = express.Router();

router.use(authentication);

router.get(
  "/all/:userId",
  param("userId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(PostController.getAllPostsOfUser)
);
router.get(
  "/:postId",
  param("postId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(PostController.getOnePost)
);

router.get(
  "/:postId/liked-users",
  param("postId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(PostController.getUsersLikedPost)
);

router.post(
  "/new-post",
  body("title").notEmpty().isString().isLength({ min: 5 }),
  body("content").notEmpty().isString(),
  validation,
  asyncHandler(PostController.createPost)
);
router.post(
  "/publish",
  body("postId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(PostController.publishPost)
);
router.post(
  "/like",
  body("userId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  body("postId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(PostController.likePost)
);

router.post(
  "/unlike",
  body("userId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  body("postId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(PostController.unLikePost)
);

router.put(
  "/:postId",
  param("postId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(PostController.updatePost)
);

router.delete(
  "/:postId",
  param("postId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(PostController.deletePost)
);

export default router;
