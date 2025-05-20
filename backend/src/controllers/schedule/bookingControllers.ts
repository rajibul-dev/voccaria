import { Request, Response } from "express";

export async function getBookings(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: "Get all bookings",
  });
}

export async function createBooking(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(201).json({
    message: "Create a new booking",
  });
}

export async function getBookingWithId(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: `Get booking with id ${request.params.bookingId}`,
  });
}

export async function updateBooking(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    message: `Update booking with id ${request.params.bookingId}`,
  });
}
