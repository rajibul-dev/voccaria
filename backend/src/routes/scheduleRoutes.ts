import { Router } from "express";
import { authorizeUser } from "../middlewares/authorizeUserMiddleware.js";

import studentAvailabilityRoutes from "./schedule/studentAvailabilityRoutes.js";
import adminStudentAvailabilityRoutes from "./schedule/adminStudentAvailabilityRoutes.js";
import miaSlotRoutes from "./schedule/miaSlotRoutes.js";
import bookingRoutes from "./schedule/bookingRoutes.js";

const router = Router();

router.use("/availability", authorizeUser, studentAvailabilityRoutes);

export default router;
