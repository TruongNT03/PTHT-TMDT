import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import session from "express-session";

import UserRoute from "./routes/User.js";
import AddressRoute from "./routes/Address.js";
import SectionRoute from "./routes/Section.js";
import CategoryRoute from "./routes/Category.js";
import ProductRoute from "./routes/Product.js";
import VariantRoute from "./routes/ProductVariantValue.js";

import db from "./models/index.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(
  new GoogleStrategy(
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
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, type: user.type },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "30d" }
      );
      user.token = token;
      return cb(null, user);
    }
  )
);
app.use("/images", express.static("images"));

app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/address", AddressRoute);
app.use("/api/v1/section", SectionRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/variant", VariantRoute);

app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listen at PORT: ${PORT}`);
});
