import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import UserController from "../../controllers/user.controller";
import { authentication } from "../../middlewares/auth";
import { body, param } from "express-validator";
import mongoose, { Types } from "mongoose";
import { validation } from "../../middlewares/validation";
const router = express.Router();

router.use(authentication);
router.get("/current", asyncHandler(UserController.getCurrentUser));
router.put(
  "/:userId",
  param("userId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(UserController.updateUserInfo)
);

router.post(
  "/follow",
  body("fromUserId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  body("toUserId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(UserController.follow)
);

router.post(
  "/unfollow",
  body("fromUserId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  body("toUserId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(UserController.unfollow)
);

export default router;
