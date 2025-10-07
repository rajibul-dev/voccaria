import passport from "passport";
import { Strategy } from "passport-local";
import User, { IUser } from "../models/User.js";

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
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    done(null, user);
  } catch (err) {
    console.error("Error deserializing user:", err);
    done(err, null);
  }
});
