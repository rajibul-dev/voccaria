export function requireRole(...roles: string[]) {
  return function (request: any, response: any, next: any) {
    if (request.user && roles.includes(request.user.role)) {
      return next();
    } else {
      return response
        .status(403)
        .json({ message: "You don't have the permission to do this" });
    }
  };
}
