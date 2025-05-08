import { Router } from "express";
import {
  getAllUsers,
  getUser,
  removeAvatar,
  showMe,
  updateAvatar,
  updateMe,
} from "../controllers/userControllers.js";
import { authorizeUser } from "../middlewares/authorizeUserMiddleware.js";

const router = Router();

export const allStaffRoles = ["staff", "raji", "mia"];

router.route("/").get(authorizeUser, getAllUsers);

router.route("/me").get(authorizeUser, showMe).patch(authorizeUser, updateMe);

router
  .route("/me/avatar")
  .patch(authorizeUser, updateAvatar)
  .delete(authorizeUser, removeAvatar);

router.route("/:id").get(authorizeUser, getUser);

export default router;
