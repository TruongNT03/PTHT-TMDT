import { Router } from "express";

import * as User from "../controller/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import authorization from "../middlewares/authorization.js";

const route = Router();

route.post("/register", asyncHandler(User.register));
route.post("/login", asyncHandler(User.login));
route.get("/", authorization, asyncHandler(User.getUserData));
route.put("/changepassword", authorization, asyncHandler(User.changePassword));

export default route;
