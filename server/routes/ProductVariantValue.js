import Router from "express";

import asyncHandler from "../middlewares/asyncHandler";
import authorizeAdmin from "../middlewares/authorizeAdmin";
import * as Controller from "../controller/ProductVariantValue";

const router = Router();

router.post(
  "",
  authorizeAdmin,
  asyncHandler(Controller.insertProductVariantValue)
);

export default router;
