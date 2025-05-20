import { Router } from "express";
import { authorizeUser } from "../middlewares/authorizeUserMiddleware.js";

import studentAvailabilityRoutes from "./schedule/studentAvailabilityRoutes.js";
import adminStudentAvailabilityRoutes from "./schedule/adminStudentAvailabilityRoutes.js";
import miaSlotRoutes from "./schedule/miaSlotRoutes.js";
import bookingRoutes from "./schedule/bookingRoutes.js";

import { requireRole } from "../middlewares/requireRole.js";
import { ALL_STAFF_ROLES, STUDENTS_ROLES } from "../constants/roles.js";

const router = Router();

router.use("/availability", authorizeUser, studentAvailabilityRoutes);

router.use(
  "/admin/students-availability",
  authorizeUser,
  requireRole(...ALL_STAFF_ROLES),
  adminStudentAvailabilityRoutes
);

router.use("/mia", authorizeUser, requireRole("mia", "raji"), miaSlotRoutes);

router.use(
  "/booking",
  authorizeUser,
  requireRole(...STUDENTS_ROLES),
  bookingRoutes
);

export default router;
