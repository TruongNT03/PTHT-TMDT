import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import db from "./models";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/v1/auth/google/callback",
  },
  async function (accessToken, refreshToken, profile, cb) {
    const [user, created] = await db.users.findOrCreate({
      where: {
        type: "GOOGLE",
        email: profile.emails[0].value,
      },
      defaults: {
        type: "GOOGLE",
        email: profile.emails[0].value,
        lastname: profile.displayName,
        avatar: profile.photos[0].value,
      },
    });
    const access_token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, type: user.type },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "15m" }
    );
    const refresh_token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, type: user.type },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "30d" }
    );
    user.accessToken = access_token;
    user.refreshToken = refresh_token;
    return cb(null, user);
  }
);

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL:
      "https://5ebd-2001-ee0-4905-17d0-5514-d361-1822-4d15.ngrok-free.app/api/v1/auth/facebook/callback",
  },
  async function (accessToken, refreshToken, profile, cb) {
    console.log(profile);
    // const [user, created] = await db.users.findOrCreate({
    //   where: {
    //     type: "FACEBOOK",
    //     email: profile.emails[0].value,
    //   },
    //   defaults: {
    //     type: "FACEBOOK",
    //     email: profile.emails[0].value,
    //     lastname: profile.displayName,
    //     avatar: profile.photos[0].value,
    //   },
    // });
    // const token = jwt.sign(
    //   { id: user.id, email: user.email, role: user.role, type: user.type },
    //   process.env.JWT_PRIVATE_KEY,
    //   { expiresIn: "30d" }
    // );
    // user.token = token;
    // return cb(null, user);
  }
);

export { googleStrategy, facebookStrategy };
