import { Router } from "express";
import {
  addAvatar,
  discordRedirect,
  getAllUsers,
  getUser,
  removeAvatar,
  showMe,
  selectAvatarFromProviders,
  updateMe,
  getAvailableProviders,
  getAvatarProxy,
} from "../controllers/userControllers.js";
import { authorizeUser } from "../middlewares/authorizeUserMiddleware.js";
import passport from "passport";

const router = Router();

router.route("/").get(authorizeUser, getAllUsers);

router.route("/me").get(authorizeUser, showMe).patch(authorizeUser, updateMe);

router.route("/me/providers").get(authorizeUser, getAvailableProviders);

router
  .route("/me/avatar")
  .post(authorizeUser, addAvatar)
  .patch(authorizeUser, selectAvatarFromProviders)
  .delete(authorizeUser, removeAvatar);

router.route("/me/avatar/proxy").get(getAvatarProxy);

router
  .route("/discord-connect")
  .get(authorizeUser, passport.authenticate("discord"));

router
  .route("/discord-connect/redirect")
  .get(passport.authenticate("discord"), discordRedirect);

router.route("/:id").get(authorizeUser, getUser);

export default router;
