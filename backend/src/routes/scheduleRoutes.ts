import { Router } from "express";
import { authorizeUser } from "../middlewares/authorizeUserMiddleware.js";

import studentAvailabilityRoutes from "./schedule/studentAvailabilityRoutes.js";
import adminStudentAvailabilityRoutes from "./schedule/adminStudentAvailabilityRoutes.js";
import miaSlotRoutes from "./schedule/miaSlotRoutes.js";
import bookingRoutes from "./schedule/bookingRoutes.js";

import { requireRole } from "../middlewares/requireRole.js";
import { ALL_STAFF_ROLES, ROLE, STUDENTS_ROLES } from "../constants/roles.js";

const router = Router();
const { MIA, RAJI } = ROLE;

router.use("/availability", authorizeUser, studentAvailabilityRoutes);

router.use(
  "/admin/students-availability",
  authorizeUser,
  requireRole(...ALL_STAFF_ROLES),
  adminStudentAvailabilityRoutes
);

router.use("/mia", authorizeUser, requireRole(MIA, RAJI), miaSlotRoutes);

router.use(
  "/booking",
  authorizeUser,
  requireRole(...STUDENTS_ROLES),
  bookingRoutes
);

router.use("mia/bookings", authorizeUser, requireRole(MIA, RAJI));

export default router;
