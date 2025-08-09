import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import User, { IUser } from "../../models/User.js";

const isProduction = process.env.NODE_ENV === "production";

const DISCORD_CLIENT_ID = process.env.PASSPORT_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.PASSPORT_DISCORD_CLIENT_SECRET;

const DISCORD_CALLBACK_URL = isProduction
  ? "https://api.voccaria.com/api/v1/users/discord-connect/redirect"
  : "http://localhost:5000/api/v1/users/discord-connect/redirect";

export default passport.use(
  new DiscordStrategy(
    {
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: DISCORD_CALLBACK_URL,
      scope: ["identify", "email"],
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const { id, username, avatar, email, global_name, verified } = profile;
      const baseAvatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}`;
      const isAnimated = avatar?.startsWith("a_");
      const avatarUrl = `${baseAvatarUrl}.${isAnimated ? "gif" : "png"}?size=512`; // Reduced from 4096

      if (!verified) {
        return done(new Error("Your discord account should be verified"), null);
      }

      const userInRequest: IUser = request.user as IUser;

      try {
        const user = await User.findById(userInRequest._id);

        if (user) {
          user.discord = {
            id,
            username,
            email,
            display_name: global_name,
            verified,
            avatar: avatarUrl,
          };

          user.avatars.discord = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=512`; // Reduced from 4096
          await user.save();

          return done(null, user);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
