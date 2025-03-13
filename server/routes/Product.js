import Route from "express";

import * as ProductController from "../controller/Product";
import asyncHandler from "../middlewares/asyncHandler";
import authorizeAdmin from "../middlewares/authorizeAdmin";

const router = Route();

router.post("/", authorizeAdmin, asyncHandler(ProductController.insertProduct));
router.put("/", authorizeAdmin, asyncHandler(ProductController.updateProduct));
router.get("/", asyncHandler(ProductController.getProduct));
router.delete(
  "/",
  authorizeAdmin,
  asyncHandler(ProductController.deleteProduct)
);

export default router;
