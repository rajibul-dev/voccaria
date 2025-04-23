import crypto from "crypto";
import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/hashPassword.js";
import { sendAccountVerificationEmail } from "../helpers/sendAccountVerificationEmail.js";

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

      existingUser.role = role;
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

export async function forgotPassword(
  request: Request,
  response: Response
): Promise<any> {}

export async function login(
  request: Request,
  response: Response
): Promise<any> {
  response.status(StatusCodes.OK).json({
    success: true,
    message: "User logged in successfully",
  });
}

export async function resetPassword(
  request: Request,
  response: Response
): Promise<any> {}

export async function changePassword(
  request: Request,
  response: Response
): Promise<any> {}

export async function logout(
  request: Request,
  response: Response
): Promise<any> {
  if (!request.user) {
    return response.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "User not logged in",
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
