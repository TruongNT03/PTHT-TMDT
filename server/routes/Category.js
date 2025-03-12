import Route from "express";

import * as CategoryController from "../controller/Category";
import asyncHandler from "../middlewares/asyncHandler";
import authorizeAdmin from "../middlewares/authorizeAdmin";

const router = Route();

router.get("/", asyncHandler(CategoryController.getCategory));

router.post(
  "/",
  authorizeAdmin,
  asyncHandler(CategoryController.insertCategory)
);

router.put(
  "/",
  authorizeAdmin,
  asyncHandler(CategoryController.updateCategory)
);

router.delete(
  "/",
  authorizeAdmin,
  asyncHandler(CategoryController.deleteCategory)
);

export default router;
