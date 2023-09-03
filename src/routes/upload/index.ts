import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import UploadController from "../../controllers/upload.controller";
import cloudUploader from "../../middlewares/cloudUploader";
import { authentication } from "../../middlewares/auth";
const router = express.Router();

router.use(authentication);

router.post(
  "/:postId/image",
  cloudUploader.single("image"),
  asyncHandler(UploadController.uploadImage)
);

export default router;
