import e, { Request, Response } from "express";

export async function miaGetAllBookings(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: "Mia get all bookings",
  });
}

export async function miaGetBookingWithId(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: `Mia get booking with id ${request.params.bookingId}`,
  });
}

export async function miaUpdateBooking(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: `Mia update booking with id ${request.params.bookingId}`,
  });
}

export async function miaCancelBooking(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: `Mia delete booking with id ${request.params.bookingId}`,
  });
}
