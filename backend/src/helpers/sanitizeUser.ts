import { IUser } from "../models/User.js";

export function sanitizeUser(user: IUser) {
  return {
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
}
