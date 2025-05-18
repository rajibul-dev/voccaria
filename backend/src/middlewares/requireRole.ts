import { StatusCodes } from "http-status-codes";
import { StaffRole } from "../constants/roles.js";

export function requireRole(...roles: StaffRole[]) {
  return function (request: any, response: any, next: any) {
    if (request.user && roles.includes(request.user.role)) {
      return next();
    } else {
      return response.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "You don't have the permission to do this",
      });
    }
  };
}
