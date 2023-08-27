import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import UploadController from "../../controllers/upload.controller";
const router = express.Router();

router.post(
  "/image",
  // upload.single("file"),
  asyncHandler(UploadController.uploadImage)
);

export default router;
