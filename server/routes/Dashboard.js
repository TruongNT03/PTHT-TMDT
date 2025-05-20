import { Router } from "express";

import * as DashboardController from "../controller/Dashboard.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorizeAdmin from "../middlewares/authorizeAdmin.js";

const router = Router();

router.get("/", authorizeAdmin, asyncHandler(DashboardController.getDashboard));

export default router;
