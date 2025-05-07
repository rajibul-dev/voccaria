import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export async function getUser(
  request: Request,
  response: Response
): Promise<any> {
  const { id } = request.params;

  let user: IUser | null;
  try {
    user = await User.findById(id).select("-hashedPassword -__v");
  } catch (error) {
    return response.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  if (user) {
    return response.status(StatusCodes.OK).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  }
}

export async function getAllUsers(
  request: Request,
  response: Response
): Promise<any> {
  const users = await User.find().select("-hashedPassword -__v");
  return response.status(StatusCodes.OK).json({
    success: true,
    message: "Users fetched successfully",
    data: { ...users, length: users.length },
  });
}

export async function showMe(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    success: true,
    data: request.user,
  });
}

export async function updateUser(
  request: Request,
  response: Response
): Promise<any> {}

export async function updateAvatar(
  request: Request,
  response: Response
): Promise<any> {}

export async function removeAvatar(
  request: Request,
  response: Response
): Promise<any> {}
