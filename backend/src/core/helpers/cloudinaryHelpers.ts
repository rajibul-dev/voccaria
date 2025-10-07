import { v2 as cloudinary } from "cloudinary";

/**
 * Deletes an image from Cloudinary by extracting its public ID.
 * Handles version prefixes and URL-encoded characters.
 *
 * @param imageUrl - The full Cloudinary image URL.
 * @returns A promise resolving to the Cloudinary deletion result.
 */
export async function deleteAvatarFromCloudinary(
  imageUrl: string
): Promise<any> {
  if (!imageUrl) {
    throw new Error("imageUrl is required");
  }

  // 1. Get everything after '/upload/'
  const afterUpload = imageUrl.split("/upload/")[1];
  if (!afterUpload) {
    throw new Error("URL doesn't contain '/upload/' segment");
  }

  // 2. Break into segments
  const segments = afterUpload.split("/");

  // 3. Drop version prefix if present (e.g. 'v1747148738')
  if (segments[0].match(/^v\d+$/)) {
    segments.shift();
  }

  // 4. Reconstruct path, decode URL-encoded chars
  const fullPath = decodeURIComponent(segments.join("/"));
  //    e.g. "voccaria/avatars/681485cec1d44c1679ff65f4/Akuma no Ko.jpg"

  // 5. Remove file extension (if present)
  const lastDot = fullPath.lastIndexOf(".");
  let publicId;
  if (lastDot === -1) {
    // No extension found, use the full path as public ID
    console.log("No file extension found, using full path as publicId");
    publicId = fullPath;
  } else {
    publicId = fullPath.substring(0, lastDot);
  }
  //    e.g. "voccaria/avatars/681485cec1d44c1679ff65f4/Akuma no Ko"

  console.log("Deleting Cloudinary publicId:", publicId);

  // 6. Delete via API
  try {
    const result = await cloudinary.api.delete_resources([publicId], {
      type: "upload",
      resource_type: "image",
    });
    return result;
  } catch (err) {
    console.error("Cloudinary deletion error:", err);
    throw err;
  }
}
