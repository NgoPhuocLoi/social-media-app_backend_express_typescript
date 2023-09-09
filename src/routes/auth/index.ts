import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AuthController } from "../../controllers";
import { body } from "express-validator";
import { validation } from "../../middlewares/validation";
const router = express.Router();

router.post(
  "/register",
  body("email").notEmpty().isEmail().withMessage("Please enter a valid email!"),
  body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 8 })
    .withMessage("Passowrd must be at least 8 characters"),
  validation,
  asyncHandler(AuthController.register)
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email!"),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Passowrd must be at least 8 characters"),
  validation,
  asyncHandler(AuthController.login)
);

export default router;
