import { Router } from "express";
import passport from "passport";

import {
  changePassword,
  getPasswordResetLink,
  googleRedirect,
  logout,
  register,
  requestNewVerificationEmail,
  resetPassword,
  verifyEmail,
} from "../controllers/authControllers.js";
import { authorizeUser } from "../middlewares/authorizeUserMiddleware.js";
import { sanitizeUser } from "../helpers/sanitizeUser.js";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../models/User.js";

const router = Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/request-new-verification-email", requestNewVerificationEmail);

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    (err: any, user: IUser | false, info: { message?: string } | undefined) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: info?.message || "Server error during authentication",
        });
      }

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: info?.message || "Invalid credentials",
        });
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: info?.message || "Failed to login",
          });
        }

        return res.status(StatusCodes.OK).json({
          success: true,
          message: "User logged in successfully",
          data: {
            user: sanitizeUser(user),
          },
        });
      });
    }
  )(req, res, next);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account",
  })
);
router.get("/google/redirect", passport.authenticate("google"), googleRedirect);
router.post("/logout", logout);
router.post("/forgot-password", getPasswordResetLink);
router.post("/reset-password", resetPassword);
router.post("/change-password", authorizeUser, changePassword);

export default router;
