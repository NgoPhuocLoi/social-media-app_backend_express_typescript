import express from "express";
import authRouter from "./auth";
import userRouter from "./user";
import postRouter from "./post";
import uploadRouter from "./upload";

const router = express.Router();

router.use("/v1/api/upload", uploadRouter);
router.use("/v1/api/auth", authRouter);
router.use("/v1/api/user", userRouter);
router.use("/v1/api/post", postRouter);

export default router;
