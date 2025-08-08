import { StatusCodes } from "http-status-codes";

export function authorizeUser(request: any, response: any, next: any) {
  if (!request.isAuthenticated?.() || !request.user) {
    return response.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "User not logged in",
    });
  }

  next();
}
