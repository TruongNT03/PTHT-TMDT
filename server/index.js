import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

import UserRoute from "./routes/User.js";
import AddressRoute from "./routes/Address.js";
import SectionRoute from "./routes/Section.js";
import CategoryRoute from "./routes/Category.js";
import SubCategoryRoute from "./routes/SubCategory.js";
import ProductRoute from "./routes/Product.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/address", AddressRoute);
app.use("/api/v1/section", SectionRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/subcategory", SubCategoryRoute);
app.use("/api/v1/product", ProductRoute);

app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listen at PORT: ${PORT}`);
});
