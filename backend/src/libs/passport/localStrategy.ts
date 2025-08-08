import passport from "passport";
import { Strategy } from "passport-local";
import User, { IUser } from "../../models/User.js";

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      if (user.provider !== "local") {
        return done(null, false, {
          message: `User registered with a different provider: ${user.provider}`,
        });
      }

      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        return done(null, false, { message: "Invalid password" });
      }

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);

passport.serializeUser((user: IUser, done) => {
  console.log("🔍 PASSPORT_SERIALIZE: Serializing user");
  console.log("🔍 PASSPORT_SERIALIZE: User ID:", user._id);
  console.log("🔍 PASSPORT_SERIALIZE: User email:", user.email);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  console.log("🔍 PASSPORT_DESERIALIZE: Deserializing user with ID:", id);
  try {
    const user = await User.findById(id);
    console.log("🔍 PASSPORT_DESERIALIZE: User found:", !!user);
    if (user) {
      console.log("🔍 PASSPORT_DESERIALIZE: User email:", user.email);
      console.log("🔍 PASSPORT_DESERIALIZE: User type:", typeof user);
      console.log(
        "🔍 PASSPORT_DESERIALIZE: User constructor:",
        user.constructor.name
      );
      console.log("🔍 PASSPORT_DESERIALIZE: User keys:", Object.keys(user));
    }
    if (!user) {
      console.error("❌ PASSPORT_DESERIALIZE: User not found in database");
      throw new Error("User not found");
    }
    console.log("✅ PASSPORT_DESERIALIZE: User deserialized successfully");
    done(null, user);
  } catch (err) {
    console.error("❌ PASSPORT_DESERIALIZE: Error deserializing user:", err);
    done(err, null);
  }
});
