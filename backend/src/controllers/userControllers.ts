import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";
import { deleteAvatarFromCloudinary } from "../helpers/cloudinaryHelpers.js";

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
  const { name, bio } = request.body;

  if (!name && bio === undefined) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Nothing was provided for updating",
    });
  }

  const user = await User.findOne(_id);

  if (name) user.name = name;
  if (bio || bio === "") user.bio = bio;
  await user.save();

  return response.status(StatusCodes.OK).json({
    success: true,
    message: "User updated successfully",
    data: { user },
  });
}

export async function addAvatar(
  request: Request,
  response: Response
): Promise<any> {
  const reqUser = request.user as IUser;

  const file = request.files?.avatar;
  if (!file) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "No file selected",
    });
  }

  // Async delete old avatar (non-blocking)
  if (reqUser.avatars?.selected === "manual" && reqUser.avatars.manual) {
    deleteAvatarFromCloudinary(reqUser.avatars.manual).catch(console.error);
  }

  const folderPath = `voccaria/avatars/${reqUser._id}`;

  // Upload new avatar (wait for completion)
  const result = await cloudinary.uploader.upload((file as any).tempFilePath, {
    folder: folderPath,
    resource_type: "auto",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  });

  // Update user avatars in DB
  await User.findByIdAndUpdate(reqUser._id, {
    "avatars.manual": result.secure_url,
    "avatars.selected": "manual",
  });

  return response.status(StatusCodes.CREATED).json({
    success: true,
    message: "Uploaded avatar successfully",
    data: { url: result.secure_url },
  });
}

export async function getAvailableProviders(
  request: Request,
  response: Response
): Promise<any> {
  const reqUser: IUser = request.user as IUser;
  const user = await User.findById(reqUser._id);

  const availableProviders = [];

  if (user.google.id) availableProviders.push("google");
  if (user.discord.id) availableProviders.push("discord");

  return response.status(StatusCodes.OK).json({
    success: true,
    data: availableProviders,
  });
}

export async function selectAvatarFromProviders(
  request: Request,
  response: Response
): Promise<any> {
  const { provider } = request.body;
  const reqUser: IUser = request.user as IUser;
  const user = await User.findById(reqUser._id);

  if (!provider) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Please provide the 'select' field",
    });
  }

  if (provider === user.avatars.selected) {
    return response.status(StatusCodes.OK).json({
      success: true,
      message: `Already selected ${provider}`,
    });
  }

  const hasSelectedAvatar = !!user.avatars[provider];

  // If the selected provider is not available
  if (!hasSelectedAvatar) {
    const fallback =
      provider === "discord" && user.avatars.google
        ? "google"
        : provider === "google" && user.avatars.discord
          ? "discord"
          : null;

    if (fallback) {
      user.avatars.selected = fallback;
    } else {
      return response.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: `No avatar in your ${provider}, or other provider`,
      });
    }

    await user.save();

    return response.status(StatusCodes.OK).json({
      success: true,
      message: `Fallback used — '${fallback || "manual"}' selected as '${provider}' was not available.`,
      data: { url: user.avatar, user },
    });
  }

  // If selected provider is valid and present
  user.avatars.selected = provider;
  await user.save();

  return response.status(StatusCodes.OK).json({
    success: true,
    message: `Chosen avatar from '${provider}' successfully.`,
    data: { url: user.avatar, user },
  });
}

export async function removeAvatar(
  request: Request,
  response: Response
): Promise<any> {
  const reqUser: IUser = request.user as IUser;
  const user = await User.findById(reqUser._id);

  if (user.avatar === null && user.avatars.manual === null) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `There is no avatar to delete`,
    });
  }

  await deleteAvatarFromCloudinary(user.avatars.manual);
  user.avatars.manual = null;

  // If manual was selected, switch to Google or Discord, else fallback to default
  // if (user.avatars.selected === "manual") {
  //   user.avatars.selected = user.avatars.google
  //     ? "google"
  //     : user.avatars.discord
  //       ? "discord"
  //       : "manual";
  // }

  await user.save();

  return response.status(StatusCodes.OK).json({
    success: true,
    message: `Avatar removed successfully`,
    data: { user },
  });
}

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
