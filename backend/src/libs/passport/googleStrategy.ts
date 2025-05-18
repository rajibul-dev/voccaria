import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import User, { IUser } from "../../models/User.js";
import { googleAvatarQualityImprove } from "../../helpers/avatarQualityImprove.js";

const GOOGLE_CLIENT_ID = process.env.PASSPORT_GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.PASSPORT_GOOGLE_CLIENT_SECRET || "";
const isProduction = process.env.NODE_ENV === "production";

const GOOGLE_CALLBACK_URL = isProduction
  ? "https://voccaria.com/api/v1/auth/google/redirect"
  : "http://localhost:5000/api/v1/auth/google/redirect";

export default passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { sub: id, name, email, picture, email_verified } = profile._json;
      const avatar = googleAvatarQualityImprove(picture);
      if (!email_verified) {
        return done(new Error("Email not verified"), null);
      }

      let user: IUser | null;

      try {
        user = await User.findOne({ providerId: id });
      } catch (err) {
        return done(err, null);
      }

      if (user) {
        // if user exists with Google provider, just login the user
        return done(null, user);
      } else {
        if (!user) {
          // if user has an account locally, we need to login the user without providing the password
          try {
            const existingUserLocal = await User.findOne({
              email,
              provider: "local",
              isVerified: true,
            });
            if (existingUserLocal) {
              return done(null, existingUserLocal);
            }
          } catch (err) {
            return done(err, null);
          }

          try {
            // if user doesn't exist, create a new one
            const newUser = await User.create({
              name,
              email,
              providerId: id,
              provider: "google",
              isVerified: true,
              verified: new Date(Date.now()),
            });

            const isFirstAccount = (await User.countDocuments({})) === 0;
            const role = isFirstAccount ? "raji" : "user";

            newUser.roles = [role];
            newUser.avatars.google = avatar;
            newUser.avatars.selected = "google";

            newUser.google = {
              id,
              name,
              email,
              avatar,
              email_verified,
            };

            await newUser.save();
            return done(null, newUser);
          } catch (err) {
            return done(err, null);
          }
        }
      }
    }
  )
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
