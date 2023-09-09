import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import UploadController from "../../controllers/upload.controller";
import cloudUploader from "../../middlewares/cloudUploader";
import { authentication } from "../../middlewares/auth";
import { body, param } from "express-validator";
import mongoose from "mongoose";
import { validation } from "../../middlewares/validation";
const router = express.Router();

router.use(authentication);

router.post(
  "/:postId/image",
  param("userId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  body("image").notEmpty().withMessage("Missing image"),
  validation,
  cloudUploader.single("image"),
  asyncHandler(UploadController.uploadImage)
);

export default router;
