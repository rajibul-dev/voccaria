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

const router = Router();

// router
//   .route("/")
//   .get(authenticateUser, authorizePermissions("admin"), getAllUsers);
router.route("/showMe").get(authorizeUser, showMe);
// router.route("/updateUser").patch(authenticateUser, updateUser);
// router.route("/updateAvatar").patch(authenticateUser, updateAvatar);
// router.route("/removeAvatar").delete(authenticateUser, removeAvatar);
// router.route("/:id").get(authenticateUser, getUser);

export default router;
