import express from "express";
import authRouter from "./auth";
import userRouter from "./user";

const router = express.Router();

router.use("/v1/api/auth", authRouter);
router.use("/v1/api/user", userRouter);

export default router;
