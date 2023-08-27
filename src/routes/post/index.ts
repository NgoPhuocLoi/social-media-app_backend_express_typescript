import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import PostController from "../../controllers/post.controller";
import { authentication } from "../../middlewares/auth";
const router = express.Router();

router.use(authentication);

router.get("/all", asyncHandler(PostController.getAllPostsOfUser));
router.get("/:postId", asyncHandler(PostController.getOnePost));
router.post("/new-post", asyncHandler(PostController.createPost));
router.put("/:postId", asyncHandler(PostController.updatePost));
router.delete("/:postId", asyncHandler(PostController.deletePost));

export default router;
