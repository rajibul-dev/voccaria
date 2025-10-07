import { Router } from "express";
import {
  createBooking,
  getBookingWithId,
  getBookings,
  updateBooking,
} from "../controllers/bookingControllers.js";
const router = Router();

router.route("/").get(getBookings).post(createBooking);
router.route("/:bookingId").get(getBookingWithId).patch(updateBooking);

export default router;
