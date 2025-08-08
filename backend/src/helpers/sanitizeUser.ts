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
      JSON.stringify(sanitized);
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
