import { IUser } from "../models/User.js";

export function sanitizeUser(user: IUser) {
  if (!user) {
    throw new Error("User object is null or undefined");
  }

  try {
    const sanitized = {
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      isVerified: user.isVerified,
      verified: user.verified,
      provider: user.provider,
      providerId: user.providerId,
      avatar: user.avatar,
      avatars: user.avatars,
      google: user.google,
      discord: user.discord,
      bio: user.bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Test JSON serialization
    try {
      const jsonString = JSON.stringify(sanitized);

      // Temporary debug logging for Discord issue
      console.log("🔍 SANITIZE_DISCORD: JSON length:", jsonString.length);
      if (user.discord) {
        console.log("🔍 SANITIZE_DISCORD: Discord data present");
        console.log(
          "🔍 SANITIZE_DISCORD: Discord JSON length:",
          JSON.stringify(user.discord).length
        );
      }
    } catch (jsonError) {
      console.error("JSON serialization failed:", jsonError);
      throw new Error(`JSON serialization failed: ${jsonError.message}`);
    }

    return sanitized;
  } catch (error) {
    console.error("Error in sanitizeUser:", error);
    throw error;
  }
}
