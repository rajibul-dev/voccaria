import crypto from "crypto";
import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../helpers/hashPassword.js";
import { sendAccountVerificationEmail } from "../helpers/sendAccountVerificationEmail.js";
import { sendPasswordResetLink } from "../helpers/sendPasswordResetLink.js";
import createHash from "../helpers/createHash.js";
import { sanitizeUser } from "../helpers/sanitizeUser.js";

export async function register(
  request: Request,
  response: Response
): Promise<any> {
  const { email, password, name } = request.body || {};

  if (!email || !password || !name) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // case: where user exists and is verified
    if (existingUser.isVerified) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "An account already exists with this email",
      });
    } else {
      // case: where user exists but is not verified
      const verificationToken = crypto.randomBytes(40).toString("hex");
      existingUser.verificationToken = verificationToken;
      const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${email}`;
      const isFirstAccount = (await User.countDocuments({})) === 0;
      const role = isFirstAccount ? "raji" : "user";

      existingUser.roles = [role];
      existingUser.name = name;
      existingUser.hashedPassword = await hashPassword(password);
      await existingUser.save();

      await sendAccountVerificationEmail({ email, verificationLink, name });
    }
  }

  // case: where user does not exist
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "raji" : "user";
  const verificationToken = crypto.randomBytes(40).toString("hex");
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${email}`;
  const hashedPassword = await hashPassword(password);

  let user: IUser;
  try {
    user = await User.create({
      email,
      hashedPassword,
      name,
      role,
      verificationToken,
    });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }

  await sendAccountVerificationEmail({
    email: user.email,
    verificationLink,
    name: user.name,
  });

  return response.status(StatusCodes.CREATED).json({
    success: true,
    message: "Success! Please check your email to verify account.",
  });
}

export async function verifyEmail(
  request: Request,
  response: Response
): Promise<any> {
  const { verificationToken, email } = request.body || {};

  if (!verificationToken || !email) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Verification token or email is missing",
    });
  }

  const user = await User.findOne({ email, verificationToken });

  if (!user) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.isVerified) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "User is already verified! Please Login.",
    });
  }

  if (user.verificationToken !== verificationToken) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Verification token is invalid or expired",
    });
  }

  user.isVerified = true;
  user.verified = new Date(Date.now());
  user.verificationToken = null;
  await user.save();

  return response.status(StatusCodes.OK).json({
    success: true,
    message: "Email verified successfully",
  });
}

export async function requestNewVerificationEmail(
  request: Request,
  response: Response
): Promise<any> {
  const { email } = request.body || {};

  if (!email) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Email is required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.isVerified) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "User is already verified! Please Login.",
    });
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${email}`;

  user.verificationToken = verificationToken;
  await user.save();

  await sendAccountVerificationEmail({
    email: user.email,
    verificationLink,
    name: user.name,
  });

  return response.status(StatusCodes.OK).json({
    success: true,
    message:
      "New verification email sent! Please check your email to verify account.",
  });
}

export async function login(
  request: Request,
  response: Response
): Promise<any> {
  const user = request.user as IUser;

  response.status(StatusCodes.OK).json({
    success: true,
    message: "User logged in successfully",
    data: {
      user: sanitizeUser(user),
    },
  });
}

export async function googleRedirect(
  request: Request,
  response: Response
): Promise<any> {
  const redirectUrl = `${process.env.FRONTEND_URL}/app/dashboard`;
  const user = request.user as IUser;
  const userId = user?._id?.toString() ?? "";

  return response.redirect(redirectUrl + `?userId=${userId}`);
}

export async function getPasswordResetLink(
  request: Request,
  response: Response
): Promise<any> {
  const { email } = request.body || {};

  if (!email) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Please provide a valid email",
    });
  }

  const user = await User.findOne({ email, isVerified: true });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    const passwordLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${passwordToken}&email=${email}`;
    const tenMinutes = 1000 * 60 * 10;
    user.passwordResetToken = createHash(passwordToken);
    user.passwordResetTokenExpires = new Date(Date.now() + tenMinutes);
    await user.save();

    await sendPasswordResetLink({
      email: user.email,
      passwordLink,
      name: user.name,
    });

    return response.status(StatusCodes.OK).json({
      success: true,
      message: "A password reset link has been sent.",
    });
  } else {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "User not found",
    });
  }
}

export async function resetPassword(
  request: Request,
  response: Response
): Promise<any> {
  const { email, token, password } = request.body || {};

  if (!email || !token || !password) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Credientials missing",
    });
  }

  // we will need this for password token validity check
  const currentDate = new Date(Date.now());

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "User not found",
    });
  }

  console.log("Stored:", user.passwordResetToken);
  console.log("Incoming Hashed:", createHash(token));

  if (user.passwordResetToken !== createHash(token)) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  if (
    user.passwordResetTokenExpires &&
    user.passwordResetTokenExpires > currentDate
  ) {
    user.hashedPassword = await hashPassword(password);
    user.passwordResetToken = null;
    user.passwordResetTokenExpires = null;
    await user.save();

    return response.status(StatusCodes.OK).json({
      success: true,
      message: "Password reset successfully",
    });
  } else {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Token expired",
    });
  }
}

export async function changePassword(
  request: Request,
  response: Response
): Promise<any> {
  const { currentPassword, newPassword } = request.body || {};
  if (!currentPassword || !newPassword) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Both current and new password are required",
    });
  }

  console.log("request.user", request.user);
  // @ts-ignore
  const user = await User.findById(request.user._id);

  if (!user) {
    return response.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return response.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Current password is incorrect",
    });
  }

  if (currentPassword === newPassword) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "New password must be different from current password",
    });
  }

  user.hashedPassword = await hashPassword(newPassword);
  await user.save();
  response.status(StatusCodes.OK).json({
    success: true,
    message: "Password changed successfully",
  });
}

export async function logout(
  request: Request,
  response: Response
): Promise<any> {
  if (!request.user) {
    return response.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "User already not logged in",
    });
  }
  request.logout((err) => {
    if (err)
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error logging out",
      });

    return response.status(StatusCodes.OK).json({
      success: true,
      message: "User logged out successfully",
    });
  });
}
