import { Router } from "express";

import * as User from "../controller/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import verifyToken from "../middlewares/verifyToken.js";
import passport from "passport";

const route = Router();

route.post("/register", asyncHandler(User.register));
route.post("/login", asyncHandler(User.login));
route.get("/", verifyToken, asyncHandler(User.getUserData));
route.put("/changepassword", verifyToken, asyncHandler(User.changePassword));
route.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
route.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    res.cookie("token", req.user.token);
    res.redirect("http://localhost:3000");
  }
);
route.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);
route.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    res.cookie("token", req.user.token);
    res.redirect("http://localhost:3000");
  }
);

export default route;
