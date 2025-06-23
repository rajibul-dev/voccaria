import { Router } from "express";
import passport from "passport";

import {
  changePassword,
  getPasswordResetLink,
  googleRedirect,
  login,
  logout,
  register,
  requestNewVerificationEmail,
  resetPassword,
  verifyEmail,
} from "../controllers/authControllers.js";
import { authorizeUser } from "../middlewares/authorizeUserMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/request-new-verification-email", requestNewVerificationEmail);
router.post("/login", passport.authenticate("local"), login);
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
