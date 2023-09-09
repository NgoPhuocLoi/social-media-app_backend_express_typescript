import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import CommentController from "../../controllers/comment.controller";
import { authentication } from "../../middlewares/auth";
const router = express.Router();

router.use(authentication);
router.post("/create", asyncHandler(CommentController.createComment));
router.get("/", asyncHandler(CommentController.getCommentsOfPostFromParent));
router.delete("/", asyncHandler(CommentController.deleteComment));

export default router;
