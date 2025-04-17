import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import passport from "passport";

import UserRoute from "./routes/User.js";
import AddressRoute from "./routes/Address.js";
import SectionRoute from "./routes/Section.js";
import CategoryRoute from "./routes/Category.js";
import ProductRoute from "./routes/Product.js";
import CartRouter from "./routes/Cart.js";
import VariantRoute from "./routes/ProductVariantValue.js";
import OrderRoute from "./routes/Order.js";

import { googleStrategy, facebookStrategy } from "./passport.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(googleStrategy);
passport.use(facebookStrategy);
app.use("/images", express.static("images"));

app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/address", AddressRoute);
app.use("/api/v1/section", SectionRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/variant", VariantRoute);
app.use("/api/v1/cart", CartRouter);
app.use("/api/v1/order", OrderRoute);

app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listen at PORT: ${PORT}`);
});
