import { Router } from "express";
import {
  miaCancelBooking,
  miaGetAllBookings,
  miaGetBookingWithId,
  miaUpdateBooking,
} from "../controllers/miaHandleBookingControllers.js";

const router = Router();

router.route("/").get(miaGetAllBookings);
router
  .route("/:bookingId")
  .get(miaGetBookingWithId)
  .patch(miaUpdateBooking)
  .delete(miaCancelBooking);
