import { StatusCodes } from "http-status-codes";

export function authorizeUser(request: any, response: any, next: any) {
  console.log("🔍 AUTH_MIDDLEWARE: Authorization check started");
  console.log("🔍 AUTH_MIDDLEWARE: Request URL:", request.url);
  console.log("🔍 AUTH_MIDDLEWARE: Request method:", request.method);
  console.log("🔍 AUTH_MIDDLEWARE: Session ID:", request.sessionID);
  console.log("🔍 AUTH_MIDDLEWARE: Session exists:", !!request.session);
  console.log(
    "🔍 AUTH_MIDDLEWARE: isAuthenticated function exists:",
    !!request.isAuthenticated
  );
  console.log(
    "🔍 AUTH_MIDDLEWARE: isAuthenticated():",
    request.isAuthenticated?.()
  );
  console.log("🔍 AUTH_MIDDLEWARE: request.user exists:", !!request.user);

  if (request.user) {
    console.log("🔍 AUTH_MIDDLEWARE: User ID:", request.user._id);
    console.log("🔍 AUTH_MIDDLEWARE: User email:", request.user.email);
    console.log("🔍 AUTH_MIDDLEWARE: User type:", typeof request.user);
    console.log(
      "🔍 AUTH_MIDDLEWARE: User constructor:",
      request.user.constructor.name
    );
  }

  if (!request.isAuthenticated?.() || !request.user) {
    console.error("❌ AUTH_MIDDLEWARE: Authentication failed");
    console.error(
      "❌ AUTH_MIDDLEWARE: isAuthenticated:",
      request.isAuthenticated?.()
    );
    console.error("❌ AUTH_MIDDLEWARE: user exists:", !!request.user);
    return response.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "User not logged in",
    });
  }

  console.log(
    "✅ AUTH_MIDDLEWARE: Authorization successful, proceeding to controller"
  );
  next();
}
