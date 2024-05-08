import Connection from "./db.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Strategy as GoogleOAuth2Strategy } from "passport-google-oauth20";
import { userdb } from "./models/userModel.js";

dotenv.config();
Connection();
export default function configurePassport(passport) {
  // setup passport
  passport.use(
    new GoogleOAuth2Strategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let isUserExist = true;
          let user = await userdb.findOne({ googleId: profile.id });

          const hashedPassword = await bcrypt.hashSync(profile.id, 10);

          if (!user) {
            user = new userdb({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              password: hashedPassword,
            });

            await user.save();
            isUserExist = false;
          }

          const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1m" }
          );

          done(null, { user, token, isUserExist });
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
