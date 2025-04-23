import { Router } from "express";
import passport from "passport";

import {
  changePassword,
  forgotPassword,
  login,
  logout,
  register,
  requestNewVerificationEmail,
  resetPassword,
  verifyEmail,
} from "../controllers/authControllers.js";

const router = Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/request-new-verification-email", requestNewVerificationEmail);
router.post("/login", passport.authenticate("local"), login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);

export default router;
