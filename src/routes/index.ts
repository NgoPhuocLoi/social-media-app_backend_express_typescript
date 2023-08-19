import express from "express";
import authRouter from "./auth";

const router = express.Router();

router.use("/v1/api/auth", authRouter);

export default router;
