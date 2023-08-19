import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import UserController from "../../controllers/user.controller";
import { authentication } from "../../middlewares/auth";
const router = express.Router();

router.use(authentication);
router.get("/current", asyncHandler(UserController.getCurrentUser));
router.put("/:userId", asyncHandler(UserController.updateUserInfo));
router.post("/follow", asyncHandler(UserController.follow));
router.post("/unfollow", asyncHandler(UserController.unfollow));

export default router;
