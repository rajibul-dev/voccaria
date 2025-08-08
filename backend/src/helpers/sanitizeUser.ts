import { IUser } from "../models/User.js";

export function sanitizeUser(user: IUser) {
  console.log("🔍 SANITIZE: Starting sanitizeUser function");
  console.log("🔍 SANITIZE: User input type:", typeof user);
  console.log("🔍 SANITIZE: User input constructor:", user?.constructor?.name);

  if (!user) {
    console.error("❌ SANITIZE: User is null or undefined");
    throw new Error("User object is null or undefined");
  }

  try {
    console.log("🔍 SANITIZE: Accessing user properties...");
    console.log("🔍 SANITIZE: user._id:", user._id);
    console.log("🔍 SANITIZE: user.name:", user.name);
    console.log("🔍 SANITIZE: user.email:", user.email);
    console.log("🔍 SANITIZE: user.roles:", user.roles);
    console.log("🔍 SANITIZE: user.isVerified:", user.isVerified);
    console.log("🔍 SANITIZE: user.verified:", user.verified);
    console.log("🔍 SANITIZE: user.provider:", user.provider);
    console.log("🔍 SANITIZE: user.providerId:", user.providerId);
    console.log("🔍 SANITIZE: user.avatar:", user.avatar);
    console.log(
      "🔍 SANITIZE: user.avatars:",
      JSON.stringify(user.avatars, null, 2)
    );
    console.log(
      "🔍 SANITIZE: user.google:",
      JSON.stringify(user.google, null, 2)
    );
    console.log(
      "🔍 SANITIZE: user.discord:",
      JSON.stringify(user.discord, null, 2)
    );
    console.log("🔍 SANITIZE: user.bio:", user.bio);
    console.log("🔍 SANITIZE: user.createdAt:", user.createdAt);
    console.log("🔍 SANITIZE: user.updatedAt:", user.updatedAt);

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

    console.log("🔍 SANITIZE: Sanitized object created successfully");
    console.log("🔍 SANITIZE: Sanitized object keys:", Object.keys(sanitized));

    // Test JSON serialization
    try {
      const jsonString = JSON.stringify(sanitized);
      console.log(
        "🔍 SANITIZE: JSON serialization test passed, length:",
        jsonString.length
      );
    } catch (jsonError) {
      console.error("❌ SANITIZE: JSON serialization failed:", jsonError);
      throw new Error(`JSON serialization failed: ${jsonError.message}`);
    }

    return sanitized;
  } catch (error) {
    console.error("❌ SANITIZE: Error in sanitizeUser:", error);
    console.error("❌ SANITIZE: Error stack:", error.stack);
    throw error;
  }
}
