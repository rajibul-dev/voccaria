// Fix avatar URLs that use /raw/upload/ instead of /image/upload/
// Run this script to fix existing broken avatar URLs in the database

import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables from the parent directory
dotenv.config({ path: "../.env" });

// User schema (simplified for this script)
const userSchema = new mongoose.Schema({
  avatars: {
    manual: String,
    selected: String,
  },
  avatar: String,
});

const User = mongoose.model("User", userSchema);

async function fixAvatarUrls() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017"
    );
    console.log("Connected to MongoDB");

    // Find users with /raw/upload/ URLs
    const usersWithBrokenUrls = await User.find({
      "avatars.manual": { $regex: "/raw/upload/" },
    });

    console.log(
      `Found ${usersWithBrokenUrls.length} users with broken avatar URLs`
    );

    let fixedCount = 0;

    for (const user of usersWithBrokenUrls) {
      const oldUrl = user.avatars.manual;
      const newUrl = oldUrl.replace("/raw/upload/", "/image/upload/");

      console.log(`Fixing user ${user._id}:`);
      console.log(`  Old URL: ${oldUrl}`);
      console.log(`  New URL: ${newUrl}`);

      // Update the URLs
      user.avatars.manual = newUrl;

      // If manual avatar is selected, update the main avatar field too
      if (user.avatars.selected === "manual") {
        user.avatar = newUrl;
      }

      await user.save();
      fixedCount++;
    }

    console.log(`✅ Fixed ${fixedCount} avatar URLs`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error fixing avatar URLs:", error);
    process.exit(1);
  }
}

// Run the script
fixAvatarUrls();
