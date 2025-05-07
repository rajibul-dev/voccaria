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

const allStaffRoles = ["staff", "raji", "mia"];

router
  .route("/")
  .get(authorizeUser, requireRole(...allStaffRoles), getAllUsers);
router.route("/showMe").get(authorizeUser, showMe);
// router.route("/updateUser").patch(authenticateUser, updateUser);
// router.route("/updateAvatar").patch(authenticateUser, updateAvatar);
// router.route("/removeAvatar").delete(authenticateUser, removeAvatar);
router.route("/:id").get(authorizeUser, requireRole(...allStaffRoles), getUser);

export default router;
