import { Router } from "express";

import * as User from "../controller/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import verifyToken from "../middlewares/verifyToken.js";

const route = Router();

route.post("/register", asyncHandler(User.register));
route.post("/login", asyncHandler(User.login));
route.get("/", verifyToken, asyncHandler(User.getUserData));
route.put("/changepassword", verifyToken, asyncHandler(User.changePassword));

export default route;
