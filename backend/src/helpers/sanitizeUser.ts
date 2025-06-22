import { IUser } from "../models/User.js";

export function sanitizeUser(user: IUser) {
  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    roles: user.roles,
  };
}
