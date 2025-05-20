import { Router } from "express";
import {
  miaCancelBooking,
  miaGetAllBookings,
  miaGetBookingWithId,
  miaUpdateBooking,
} from "../../controllers/schedule/miaHandleBookingControllers.js";

const router = Router();

router.route("/").get(miaGetAllBookings);
router
  .route("/:bookingId")
  .get(miaGetBookingWithId)
  .patch(miaUpdateBooking)
  .delete(miaCancelBooking);
