import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AuthController } from "../../controllers";
const router = express.Router();

router.post("/register", asyncHandler(AuthController.register));
router.post("/login", asyncHandler(AuthController.login));

export default router;
