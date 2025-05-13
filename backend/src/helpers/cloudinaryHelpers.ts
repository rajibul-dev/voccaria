import { v2 as cloudinary } from "cloudinary";

// utils/cloudinary.ts
export async function deleteFromCloudinary(url: string): Promise<void> {
  try {
    const match = url.match(/\/v\d+\/(.+)\.(jpg|jpeg|png|webp)/);
    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId);
    } else {
      console.warn("Could not extract public_id from URL:", url);
    }
  } catch (error) {
    console.warn("Failed to delete from Cloudinary:", error);
  }
}
