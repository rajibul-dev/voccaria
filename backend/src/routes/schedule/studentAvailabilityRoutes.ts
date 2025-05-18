import { Router } from "express";
import {
  addMyMultipleAvailability,
  addMySingleAvailability,
  deleteMyMultipleAvailability,
  deleteMysingleAvailability,
  getMyAvailability,
  getMysingleAvailability,
  updateMyMultipleAvailability,
  updateMysingleAvailability,
} from "../../controllers/schedule/studentAvailabilityControllers.js";

const router = Router();

router
  .route("/")
  .get(getMyAvailability)
  .post(addMyMultipleAvailability)
  .patch(updateMyMultipleAvailability)
  .delete(deleteMyMultipleAvailability);

router
  .route("/id")
  .get(getMysingleAvailability)
  .post(addMySingleAvailability)
  .patch(updateMysingleAvailability)
  .delete(deleteMysingleAvailability);

export default router;
