import { Request, Response } from "express";
import User, { defaultAvatar, IUser } from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";

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
    data: { users, length: users.length },
  });
}

export async function showMe(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(200).json({
    success: true,
    message: "User found successfully",
    data: request.user,
  });
}

export async function updateMe(
  request: Request,
  response: Response
): Promise<any> {
  const { _id } = request.user as IUser;
  const { name } = request.body;

  if (!name) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Name is required",
    });
  }

  const user = await User.findOne({ _id });
  user.name = name;
  await user.save();

  return response.status(StatusCodes.OK).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
}

export async function addAvatar(
  request: Request,
  response: Response
): Promise<any> {
  const reqUser: IUser = request.user as IUser;
  const user = await User.findById(reqUser._id);
  const file = request.files?.avatar;
  const folderPath = `voccaria/avatars/${user._id}`;
  const previousAvatar = user.avatars[user.avatars.selected] || null;
  const wasDefaultAvatarPlaceholder = previousAvatar === defaultAvatar;

  if (!file) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "No file selected",
    });
  }

  // Destroy previous manual avatar if it was not the default one
  if (!wasDefaultAvatarPlaceholder && user.avatars.selected === "manual") {
    try {
      // Extract public_id from URL
      const publicIdMatch = user.avatars.manual.match(
        /\/v\d+\/(.+)\.(jpg|jpeg|png|webp)/
      );
      if (publicIdMatch && publicIdMatch[1]) {
        const publicId = publicIdMatch[1];
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (error) {
      console.warn("Failed to delete previous avatar:", error);
    }
  }

  const result = await cloudinary.uploader.upload((file as any).tempFilePath, {
    folder: folderPath,
    public_id: (file as any).name.split(".")[0],
    resource_type: "auto",
  });

  user.avatars.manual = result.secure_url;
  user.avatars.selected = "manual";
  await user.save();

  return response.status(StatusCodes.CREATED).json({
    success: true,
    message: "Uploaded avatar successfully",
    data: { url: result.secure_url },
  });
}

export async function selectAvatarFromProviders(
  request: Request,
  response: Response
): Promise<any> {
  const { select } = request.body;
  const reqUser: IUser = request.user as IUser;
  const user = await User.findById(reqUser._id);

  if (!select) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Please provide the 'select' field",
    });
  }

  if (select === user.avatars.selected) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Already selected ${select}`,
    });
  }

  user.avatars.selected = select;
  await user.save();

  return response.status(StatusCodes.OK).json({
    success: true,
    message: `Chosen avatar from ${select} successfully`,
    data: { url: user.avatar },
  });
}

export async function removeAvatar(
  request: Request,
  response: Response
): Promise<any> {}

export async function discordRedirect(
  request: Request,
  response: Response
): Promise<any> {
  return response.status(StatusCodes.OK).json({
    success: true,
    message: "Connected with discord account successfully",
    data: request.user,
  });
}
