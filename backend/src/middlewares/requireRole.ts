import { StatusCodes } from "http-status-codes";

export function requireRole(...roles: string[]) {
  return function (request: any, response: any, next: any) {
    if (request.user && roles.includes(request.user.role)) {
      return next();
    } else {
      return response
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You don't have the permission to do this" });
    }
  };
}
