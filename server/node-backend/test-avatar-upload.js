#!/usr/bin/env node

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary (load from .env if exists)
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("🧪 AVATAR UPLOAD SIMULATION STARTED");
console.log("=====================================");

// Test configuration
const TEST_CONFIG = {
  userId: "test-user-123",
  testImagePath: null, // Will be set dynamically
  mimeTypes: ["image/jpeg", "image/png", "image/gif"],
};

// Create a test image if none exists
async function createTestImage() {
  const testDir = path.join(__dirname, "test-images");
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  // Create a simple PNG test image (1x1 pixel red)
  const pngData = Buffer.from([
    0x89,
    0x50,
    0x4e,
    0x47,
    0x0d,
    0x0a,
    0x1a,
    0x0a, // PNG signature
    0x00,
    0x00,
    0x00,
    0x0d, // IHDR chunk length
    0x49,
    0x48,
    0x44,
    0x52, // IHDR
    0x00,
    0x00,
    0x00,
    0x01, // Width: 1
    0x00,
    0x00,
    0x00,
    0x01, // Height: 1
    0x08,
    0x02,
    0x00,
    0x00,
    0x00, // Bit depth: 8, Color type: 2 (RGB), Compression: 0, Filter: 0, Interlace: 0
    0x90,
    0x77,
    0x53,
    0xde, // CRC
    0x00,
    0x00,
    0x00,
    0x0c, // IDAT chunk length
    0x49,
    0x44,
    0x41,
    0x54, // IDAT
    0x08,
    0x99,
    0x01,
    0x01,
    0x00,
    0x00,
    0x00,
    0xff,
    0xff,
    0x00,
    0x00,
    0x00, // Image data
    0x02,
    0x00,
    0x01,
    0xe2,
    0x21,
    0xbc,
    0x33, // CRC
    0x00,
    0x00,
    0x00,
    0x00, // IEND chunk length
    0x49,
    0x45,
    0x4e,
    0x44, // IEND
    0xae,
    0x42,
    0x60,
    0x82, // CRC
  ]);

  const testImagePath = path.join(testDir, "test-image.png");
  fs.writeFileSync(testImagePath, pngData);

  return testImagePath;
}

// Simulate file upload object like express-fileupload creates
function createMockFileObject(filePath, mimetype) {
  const fileBuffer = fs.readFileSync(filePath);
  const stats = fs.statSync(filePath);

  return {
    name: path.basename(filePath),
    mimetype: mimetype,
    size: stats.size,
    data: fileBuffer,
    tempFilePath: filePath,
  };
}

// Simulate the exact upload logic from userControllers.ts
async function simulateAvatarUpload(mockFile, userId) {
  console.log(`\n🔄 Testing upload for user: ${userId}`);
  console.log(
    `📁 File: ${mockFile.name} (${mockFile.mimetype}, ${mockFile.size} bytes)`
  );

  const folderPath = `voccaria/avatars/${userId}`;

  try {
    console.log("🔍 AVATAR_UPLOAD: Starting upload to Cloudinary");

    // Check if we have file data
    console.log("🔍 AVATAR_UPLOAD: File data available:", {
      hasData: !!mockFile.data,
      dataLength: mockFile.data?.length || 0,
      hasTempPath: !!mockFile.tempFilePath,
    });

    // Extract format from mimetype to help Cloudinary
    const mimeType = mockFile.mimetype;
    let format;
    if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
      format = "jpg";
    } else if (mimeType === "image/png") {
      format = "png";
    } else if (mimeType === "image/gif") {
      format = "gif";
    } else if (mimeType === "image/webp") {
      format = "webp";
    }

    const uploadOptions = {
      folder: folderPath,
      resource_type: "image", // Force image type
      use_filename: false,
      unique_filename: true,
      overwrite: false,
      ...(format && { format }), // Add format hint if detected
    };

    console.log("🔍 AVATAR_UPLOAD: Upload options:", uploadOptions);

    let result;

    // Use buffer if available and not empty, otherwise use temp file
    if (mockFile.data && mockFile.data.length > 0) {
      console.log("🔍 AVATAR_UPLOAD: Using buffer upload");
      result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(uploadOptions, (error, result) => {
            if (error) {
              console.error(
                "🔍 AVATAR_UPLOAD: Cloudinary stream error:",
                error
              );
              reject(error);
            } else {
              resolve(result);
            }
          })
          .end(mockFile.data);
      });
    } else if (mockFile.tempFilePath) {
      console.log("🔍 AVATAR_UPLOAD: Using temp file upload");

      // Check if the temp file actually exists and is readable
      try {
        const stats = fs.statSync(mockFile.tempFilePath);
        console.log("🔍 AVATAR_UPLOAD: Temp file stats:", {
          size: stats.size,
          isFile: stats.isFile(),
          path: mockFile.tempFilePath,
        });
      } catch (fsError) {
        console.error("🔍 AVATAR_UPLOAD: Temp file access error:", fsError);
      }

      result = await cloudinary.uploader.upload(
        mockFile.tempFilePath,
        uploadOptions
      );
    } else {
      throw new Error("No file data or temp file path available");
    }

    console.log("🔍 AVATAR_UPLOAD: Cloudinary result:", {
      secure_url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
      format: result.format,
      bytes: result.bytes,
    });

    // NUCLEAR OPTION: If Cloudinary still uploaded as 'raw', manually construct image URL
    let finalUrl = result.secure_url;

    if (result.resource_type === "raw") {
      console.log(
        "🚨 AVATAR_UPLOAD: Cloudinary uploaded as RAW despite image resource_type!"
      );

      // Manually construct the correct image URL from the public_id
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`;
      const publicId = result.public_id;

      // Determine extension from original mimetype
      let extension = "jpg"; // default fallback

      if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
        extension = "jpg";
      } else if (mimeType === "image/png") {
        extension = "png";
      } else if (mimeType === "image/gif") {
        extension = "gif";
      } else if (mimeType === "image/webp") {
        extension = "webp";
      }

      finalUrl = `${baseUrl}${publicId}.${extension}`;
      console.log(
        "🔧 AVATAR_UPLOAD: Manually constructed image URL:",
        finalUrl
      );
    }

    // Also handle the /raw/upload/ case for existing logic
    if (finalUrl.includes("/raw/upload/")) {
      finalUrl = finalUrl.replace("/raw/upload/", "/image/upload/");
      console.log(
        "🔧 AVATAR_UPLOAD: Fixed URL from /raw/ to /image/:",
        finalUrl
      );
    }

    // If the URL doesn't have an extension, add one based on the detected format or original mimetype
    if (!finalUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      let extension = result.format;

      // If Cloudinary didn't detect format, use the original file's mimetype
      if (!extension) {
        console.log(
          "🔧 AVATAR_UPLOAD: Cloudinary format undefined, using mimetype:",
          mimeType
        );

        if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
          extension = "jpg";
        } else if (mimeType === "image/png") {
          extension = "png";
        } else if (mimeType === "image/gif") {
          extension = "gif";
        } else if (mimeType === "image/webp") {
          extension = "webp";
        } else {
          extension = "jpg"; // fallback
        }
      }

      finalUrl = finalUrl + "." + extension;
      console.log("🔧 AVATAR_UPLOAD: Added extension to URL:", finalUrl);
    }

    return { finalUrl, result };
  } catch (error) {
    console.error("❌ AVATAR_UPLOAD: Upload failed:", error);
    throw error;
  }
}

// Test if the final URL is actually accessible
async function testImageAccessibility(url) {
  console.log(`\n🔍 Testing image accessibility: ${url}`);

  try {
    // Test HEAD request first (lightweight)
    const headResponse = await fetch(url, { method: "HEAD" });
    console.log("🔍 HEAD request result:", {
      status: headResponse.status,
      ok: headResponse.ok,
      statusText: headResponse.statusText,
      contentType: headResponse.headers.get("content-type"),
      contentLength: headResponse.headers.get("content-length"),
    });

    if (!headResponse.ok) {
      console.error(
        `❌ HEAD request failed: ${headResponse.status} ${headResponse.statusText}`
      );
      return false;
    }

    // Test actual GET request to verify image can be loaded
    console.log("🔍 Testing GET request...");
    const getResponse = await fetch(url);
    console.log("🔍 GET request result:", {
      status: getResponse.status,
      ok: getResponse.ok,
      statusText: getResponse.statusText,
      contentType: getResponse.headers.get("content-type"),
      contentLength: getResponse.headers.get("content-length"),
    });

    if (!getResponse.ok) {
      console.error(
        `❌ GET request failed: ${getResponse.status} ${getResponse.statusText}`
      );
      return false;
    }

    // Verify it's actually an image by checking the response
    const contentType = getResponse.headers.get("content-type");
    if (!contentType || !contentType.startsWith("image/")) {
      console.error(
        `❌ Response is not an image. Content-Type: ${contentType}`
      );
      return false;
    }

    // Check if we got actual image data
    const imageBuffer = await getResponse.buffer();
    console.log(`✅ Successfully loaded image: ${imageBuffer.length} bytes`);

    return true;
  } catch (error) {
    console.error("❌ Image accessibility test failed:", error.message);
    return false;
  }
}

// Clean up test uploads
async function cleanupTestUploads(publicIds) {
  if (publicIds.length === 0) return;

  console.log(`\n🧹 Cleaning up ${publicIds.length} test uploads...`);

  try {
    const result = await cloudinary.api.delete_resources(publicIds, {
      resource_type: "image",
    });
    console.log("🧹 Cleanup result:", result);
  } catch (error) {
    console.error("❌ Cleanup failed:", error);
  }
}

// Main test runner
async function runAvatarUploadTests() {
  const testResults = [];
  const uploadedPublicIds = [];

  try {
    // Create test image
    console.log("📝 Creating test image...");
    const testImagePath = await createTestImage();
    console.log(`✅ Test image created: ${testImagePath}`);

    // Test different mimetypes
    for (const mimeType of TEST_CONFIG.mimeTypes) {
      console.log(`\n${"=".repeat(60)}`);
      console.log(`🧪 TESTING MIMETYPE: ${mimeType}`);
      console.log(`${"=".repeat(60)}`);

      try {
        // Create mock file object
        const mockFile = createMockFileObject(testImagePath, mimeType);

        // Simulate upload
        const { finalUrl, result } = await simulateAvatarUpload(
          mockFile,
          TEST_CONFIG.userId
        );
        uploadedPublicIds.push(result.public_id);

        // Test accessibility
        const isAccessible = await testImageAccessibility(finalUrl);

        testResults.push({
          mimeType,
          finalUrl,
          cloudinaryResult: result,
          isAccessible,
          success: isAccessible,
        });
      } catch (error) {
        console.error(`❌ Test failed for ${mimeType}:`, error.message);
        testResults.push({
          mimeType,
          success: false,
          error: error.message,
        });
      }
    }

    // Print summary
    console.log(`\n${"=".repeat(60)}`);
    console.log("📊 TEST SUMMARY");
    console.log(`${"=".repeat(60)}`);

    testResults.forEach((result, index) => {
      console.log(`\n${index + 1}. ${result.mimeType}:`);
      if (result.success) {
        console.log(`   ✅ SUCCESS - Image accessible at: ${result.finalUrl}`);
        console.log(
          `   📊 Cloudinary result: resource_type=${result.cloudinaryResult.resource_type}, format=${result.cloudinaryResult.format}`
        );
      } else {
        console.log(`   ❌ FAILED - ${result.error || "Image not accessible"}`);
        if (result.finalUrl) {
          console.log(`   🔗 Attempted URL: ${result.finalUrl}`);
        }
      }
    });

    const successCount = testResults.filter((r) => r.success).length;
    console.log(
      `\n🎯 OVERALL RESULT: ${successCount}/${testResults.length} tests passed`
    );

    if (successCount === testResults.length) {
      console.log("🎉 ALL TESTS PASSED! Avatar upload is working correctly.");
    } else {
      console.log("⚠️  Some tests failed. Check the logs above for details.");
    }
  } catch (error) {
    console.error("❌ Test runner failed:", error);
  } finally {
    // Cleanup
    await cleanupTestUploads(uploadedPublicIds);
  }
}

// Run the tests
runAvatarUploadTests().catch(console.error);
