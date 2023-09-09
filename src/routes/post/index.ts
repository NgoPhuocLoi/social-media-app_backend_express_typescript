import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import PostController from "../../controllers/post.controller";
import { authentication } from "../../middlewares/auth";
const router = express.Router();

router.use(authentication);

router.get("/all/:userId", asyncHandler(PostController.getAllPostsOfUser));
router.get("/:postId", asyncHandler(PostController.getOnePost));
router.get(
  "/:postId/liked-users",
  asyncHandler(PostController.getUsersLikedPost)
);

router.post("/new-post", asyncHandler(PostController.createPost));
router.post("/publish", asyncHandler(PostController.publishPost));
router.post("/like", asyncHandler(PostController.likePost));
router.post("/unlike", asyncHandler(PostController.unLikePost));

router.put("/:postId", asyncHandler(PostController.updatePost));

router.delete("/:postId", asyncHandler(PostController.deletePost));

export default router;
