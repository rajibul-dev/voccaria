import { Router } from "express";
import {
  blockHoursForStudentAvailability,
  deleteStudentAvailabilityById,
  getAllStudentsAvailability,
  getBlockedHoursForStudentAvailability,
  getStudentAvailabilityById,
  overwriteStudentAvailabilityById,
} from "../../controllers/schedule/adminStudentAvailabilityControllers.js";
const router = Router();

router.route("/").get(getAllStudentsAvailability);
router
  .route("/block")
  .post(blockHoursForStudentAvailability)
  .get(getBlockedHoursForStudentAvailability);
router
  .route("/:id")
  .get(getStudentAvailabilityById)
  .patch(overwriteStudentAvailabilityById)
  .delete(deleteStudentAvailabilityById);

export default router;
