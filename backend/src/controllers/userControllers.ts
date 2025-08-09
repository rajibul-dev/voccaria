import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";
import { deleteAvatarFromCloudinary } from "../helpers/cloudinaryHelpers.js";
import { sanitizeUser } from "../helpers/sanitizeUser.js";

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
      data: sanitizeUser(user),
    });
  }
}

export async function getAllUsers(
  request: Request,
  response: Response
): Promise<any> {
  const users = await User.find().select("-hashedPassword -__v");
  const sanitizedUsers = users.map((user) => sanitizeUser(user));
  return response.status(StatusCodes.OK).json({
    success: true,
    message: "Users fetched successfully",
    data: { users: sanitizedUsers, length: sanitizedUsers.length },
  });
}

export async function showMe(
  request: Request,
  response: Response
): Promise<any> {
  if (!request.user) {
    return response.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  try {
    const user = request.user as IUser;
    const sanitizedUser = sanitizeUser(user);

    return response.status(200).json({
      success: true,
      message: "User found successfully",
      data: sanitizedUser,
    });
  } catch (error) {
    console.error("❌ SHOWME: Error in showMe function:", error);
    return response.status(500).json({
      success: false,
      message: "Internal server error while fetching user",
      error: error.message,
    });
  }
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
    data: { user: sanitizeUser(user) },
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

  console.log("🔍 AVATAR_UPLOAD: File details:", {
    name: (file as any).name,
    mimetype: (file as any).mimetype,
    size: (file as any).size,
    tempFilePath: (file as any).tempFilePath,
  });

  // Async delete old avatar (non-blocking)
  if (reqUser.avatars?.selected === "manual" && reqUser.avatars.manual) {
    deleteAvatarFromCloudinary(reqUser.avatars.manual).catch((error) => {
      console.error("Failed to delete old avatar from Cloudinary:", error);
      // Don't fail the upload if old avatar deletion fails
    });
  }

  const folderPath = `voccaria/avatars/${reqUser._id}`;

  try {
    console.log("🔍 AVATAR_UPLOAD: Starting upload to Cloudinary");

    // Check if we have file data
    console.log("🔍 AVATAR_UPLOAD: File data available:", {
      hasData: !!(file as any).data,
      dataLength: (file as any).data?.length || 0,
      hasTempPath: !!(file as any).tempFilePath,
    });

    // Fallback to temp file path if buffer is empty
    const uploadOptions = {
      folder: folderPath,
      resource_type: "auto" as const,
      use_filename: false,
      unique_filename: true,
      overwrite: false,
    };

    let result;
    
    // Try buffer first, fallback to temp file
    if ((file as any).data && (file as any).data.length > 0) {
      console.log("🔍 AVATAR_UPLOAD: Using buffer upload");
      result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(uploadOptions, (error, result) => {
            if (error) {
              console.error("🔍 AVATAR_UPLOAD: Cloudinary stream error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          })
          .end((file as any).data);
      });
    } else {
      console.log("🔍 AVATAR_UPLOAD: Using temp file upload");
      result = await cloudinary.uploader.upload(
        (file as any).tempFilePath,
        uploadOptions
      );
    }

    console.log("🔍 AVATAR_UPLOAD: Cloudinary result:", {
      secure_url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
      format: result.format,
      bytes: result.bytes,
    });

    // Fix URL if it contains /raw/upload/ (force it to be an image URL)
    let finalUrl = result.secure_url;
    if (finalUrl.includes("/raw/upload/")) {
      finalUrl = finalUrl.replace("/raw/upload/", "/image/upload/");
      console.log(
        "🔧 AVATAR_UPLOAD: Fixed URL from /raw/ to /image/:",
        finalUrl
      );
    }

    // If the URL doesn't have an extension, add one based on the detected format
    if (!finalUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      const extension = result.format || "jpg";
      finalUrl = finalUrl + "." + extension;
      console.log("🔧 AVATAR_UPLOAD: Added extension to URL:", finalUrl);
    }

    // Update user avatars in DB - IMPORTANT: Use save() to trigger pre-save hooks
    const user = await User.findById(reqUser._id);
    user.avatars.manual = finalUrl; // Use the fixed URL
    user.avatars.selected = "manual";
    await user.save(); // This triggers the pre-save hook that sets user.avatar

    // Fetch the updated user without sensitive fields
    const updatedUser = await User.findById(reqUser._id).select(
      "-hashedPassword -__v"
    );

    return response.status(StatusCodes.CREATED).json({
      success: true,
      message: "Uploaded avatar successfully",
      data: { url: finalUrl, user: sanitizeUser(updatedUser) }, // Use the fixed URL
    });
  } catch (error) {
    console.error("❌ AVATAR_UPLOAD: Upload failed:", error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to upload avatar. Please try again.",
    });
  }
}

export async function getAvailableProviders(
  request: Request,
  response: Response
): Promise<any> {
  const reqUser: IUser = request.user as IUser;
  const user = await User.findById(reqUser._id);

  const availableProviders = ["manual"];

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

  const providerAvatar = user.avatars[provider];
  const hasSelectedAvatar = !!providerAvatar;

  // If the selected provider is not available
  if (!hasSelectedAvatar && provider !== "manual") {
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
      data: { url: user.avatar, user: sanitizeUser(user) },
    });
  }

  // If selected provider is valid and present
  user.avatars.selected = provider;
  await user.save();

  return response.status(StatusCodes.OK).json({
    success: true,
    message: `Chosen avatar from '${provider}' successfully.`,
    data: { url: user.avatar, user: sanitizeUser(user) },
  });
}

export async function getAvatarProxy(
  request: Request,
  response: Response
): Promise<any> {
  const { url } = request.query;

  if (typeof url !== "string") {
    return response.status(400).json({
      success: false,
      message: "Missing or invalid 'url' query parameter",
    });
  }

  try {
    const avatarUrl = decodeURIComponent(url);
    const fetchResponse = await fetch(avatarUrl);

    if (!fetchResponse.ok) {
      return response
        .status(fetchResponse.status)
        .send("Failed to fetch image");
    }

    const contentType =
      fetchResponse.headers.get("content-type") || "image/jpeg";
    const buffer = await fetchResponse.arrayBuffer();

    response.setHeader("Content-Type", contentType);
    return response.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Avatar proxy error:", error);
    return response
      .status(404)
      .send("Avatar not found or could not be fetched");
  }
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

  // Only delete from Cloudinary if there's actually a URL to delete
  if (user.avatars.manual) {
    try {
      await deleteAvatarFromCloudinary(user.avatars.manual);
    } catch (error) {
      console.error("Failed to delete avatar from Cloudinary:", error);
      // Don't fail the whole operation if Cloudinary deletion fails
    }
  }

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
    data: { user: sanitizeUser(user) },
  });
}

export async function discordRedirect(
  request: Request,
  response: Response
): Promise<any> {
  const redirectUrl = `${process.env.FRONTEND_URL}/app/profile`;
  return response.redirect(redirectUrl + `?discordConnect=success`);
}

export async function discordDisconnect(
  request: Request,
  response: Response
): Promise<any> {
  const reqUser: IUser = request.user as IUser;
  const user = await User.findById(reqUser._id);

  if (!user.discord?.id) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Discord profile is not connected to begin with",
    });
  }

  user.discord = null;
  user.avatars.discord = "";
  await user.save();

  return response.status(StatusCodes.OK).json({
    success: true,
    message: "Disconnected discord profile successfully",
  });
}
