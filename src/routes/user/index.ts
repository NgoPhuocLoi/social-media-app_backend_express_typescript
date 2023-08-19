import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import UserController from "../../controllers/user.controller";
import { authentication } from "../../middlewares/auth";
const router = express.Router();

router.use(authentication);
router.get("/current", asyncHandler(UserController.getCurrentUser));
router.put("/:userId", asyncHandler(UserController.updateUserInfo));

export default router;
