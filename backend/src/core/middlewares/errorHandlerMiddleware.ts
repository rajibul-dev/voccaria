import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default function errorHandlerMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error("Error:", error);
  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "Something went wrong",
  });
}
