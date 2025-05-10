import { Router } from "express";
import {
  discordRedirect,
  getAllUsers,
  getUser,
  removeAvatar,
  showMe,
  updateAvatar,
  updateMe,
} from "../controllers/userControllers.js";
import { authorizeUser } from "../middlewares/authorizeUserMiddleware.js";
import passport from "passport";

const router = Router();

export const allStaffRoles = ["staff", "raji", "mia"];

router.route("/").get(authorizeUser, getAllUsers);

router.route("/me").get(authorizeUser, showMe).patch(authorizeUser, updateMe);

router
  .route("/me/avatar")
  .patch(authorizeUser, updateAvatar)
  .delete(authorizeUser, removeAvatar);

router
  .route("/discord-connect")
  .get(authorizeUser, passport.authenticate("discord"));

router
  .route("/discord-connect/redirect")
  .get(passport.authenticate("discord"), discordRedirect);

router.route("/:id").get(authorizeUser, getUser);

export default router;
