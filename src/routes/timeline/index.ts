import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import TimelineController from "../../controllers/timeline.controller";
import { authentication } from "../../middlewares/auth";
const router = express.Router();

router.use(authentication);
router.get("/", asyncHandler(TimelineController.getTimeline));

export default router;
