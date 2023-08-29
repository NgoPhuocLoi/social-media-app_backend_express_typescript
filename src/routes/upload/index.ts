import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import UploadController from "../../controllers/upload.controller";
import cloudUploader from "../../middlewares/cloudUploader";
const router = express.Router();

router.post(
  "/:postId/image",
  cloudUploader.single("image"),
  asyncHandler(UploadController.uploadImage)
);

export default router;
