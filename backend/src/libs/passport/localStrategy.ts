import passport from "passport";
import { Strategy } from "passport-local";
import User, { IUser } from "../../models/User.js";

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");
      if (!user.comparePassword(password)) {
        throw new Error("Invalid password");
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
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
