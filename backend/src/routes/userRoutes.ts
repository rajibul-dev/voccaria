import { Router } from "express";
import {
  getAllUsers,
  getUser,
  removeAvatar,
  showMe,
  updateAvatar,
  updateUser,
} from "../controllers/userControllers.js";
import { authorizeUser } from "../middlewares/authorizeUserMiddleware.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = Router();

export const allStaffRoles = ["staff", "raji", "mia"];

router.route("/").get(authorizeUser, getAllUsers);
router.route("/:id").get(authorizeUser, getUser);

router.route("/me").get(authorizeUser, showMe).patch(authorizeUser, updateUser);

router
  .route("/me/avatar")
  .patch(authorizeUser, updateAvatar)
  .delete(authorizeUser, removeAvatar);

export default router;
