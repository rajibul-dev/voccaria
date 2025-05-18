import { StatusCodes } from "http-status-codes";
import { StaffRole } from "../constants/roles.js";

export function requireRole(...requiredRoles: StaffRole[]) {
  return function (request: any, response: any, next: any) {
    const userRoles = request.user?.roles || [];

    const hasPermission = requiredRoles.some((role) =>
      userRoles.includes(role)
    );

    if (hasPermission) {
      return next();
    } else {
      return response.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "You don't have the permission to do this",
      });
    }
  };
}
