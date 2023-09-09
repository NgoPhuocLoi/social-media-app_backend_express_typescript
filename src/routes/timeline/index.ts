import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import TimelineController from "../../controllers/timeline.controller";
import { authentication } from "../../middlewares/auth";
import { param } from "express-validator";
import mongoose from "mongoose";
import { validation } from "../../middlewares/validation";
const router = express.Router();

router.use(authentication);
router.get(
  "/:userId",
  param("userId")
    .custom((value) => mongoose.isValidObjectId(value))
    .withMessage("Invalid ObjectId"),
  validation,
  asyncHandler(TimelineController.getTimeline)
);

export default router;
