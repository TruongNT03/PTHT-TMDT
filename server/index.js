import express from "express";
import dotenv from "dotenv";

import UserRoute from "./routes/User.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/v1/auth", UserRoute);

app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listen at PORT: ${PORT}`);
});
