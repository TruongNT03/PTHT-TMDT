import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import UserRoute from "./routes/User.js";
import AddressRoute from "./routes/Address.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/address", AddressRoute);

app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listen at PORT: ${PORT}`);
});
