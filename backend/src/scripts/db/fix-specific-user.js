// Quick fix for the specific broken avatar URL
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "../.env" });

const userSchema = new mongoose.Schema({
  avatars: {
    manual: String,
    selected: String,
  },
  avatar: String,
});

const User = mongoose.model("User", userSchema);

async function fixSpecificUser() {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017"
    );
    console.log("Connected to MongoDB");

    // Find user with the specific broken URL
    const brokenUrl =
      "https://res.cloudinary.com/drtmxi7rn/raw/upload/v1754700346/voccaria/avatars/68966f4f4ee31f9b6ffddb43/tmp-2-1754700345674";
    const user = await User.findOne({ "avatars.manual": brokenUrl });

    if (user) {
      console.log(`Found user with broken URL: ${user._id}`);

      const fixedUrl = brokenUrl.replace("/raw/upload/", "/image/upload/");
      console.log(`Fixing URL:`);
      console.log(`  Old: ${brokenUrl}`);
      console.log(`  New: ${fixedUrl}`);

      user.avatars.manual = fixedUrl;
      if (user.avatars.selected === "manual") {
        user.avatar = fixedUrl;
      }

      await user.save();
      console.log("✅ User avatar URL fixed!");
    } else {
      console.log("No user found with that specific broken URL");
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

fixSpecificUser();
