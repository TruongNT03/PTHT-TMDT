import { Router } from "express";

import * as OrderController from "../controller/Order";
import asyncHandler from "../middlewares/asyncHandler";
import verifyToken from "../middlewares/verifyToken";
import authorizeAdmin from "../middlewares/authorizeAdmin";

const router = Router();

router.get("/", verifyToken, asyncHandler(OrderController.getAllOrder));
router.post("/", verifyToken, asyncHandler(OrderController.insertOrder));
router.put(
  "/",
  verifyToken,
  authorizeAdmin,
  asyncHandler(OrderController.updateOrder)
);

export default router;
