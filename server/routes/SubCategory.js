import Route from "express";

import * as SubCategoryController from "../controller/SubCategory";
import asyncHandler from "../middlewares/asyncHandler";
import authorizeAdmin from "../middlewares/authorizeAdmin";

const router = Route();

router.post(
  "/",
  authorizeAdmin,
  asyncHandler(SubCategoryController.insertSubCategory)
);
router.put(
  "/",
  authorizeAdmin,
  asyncHandler(SubCategoryController.updateSubCategory)
);
router.delete(
  "/",
  authorizeAdmin,
  asyncHandler(SubCategoryController.deleteSubCategory)
);

router.get("/", asyncHandler(SubCategoryController.getSubCategory));

export default router;
