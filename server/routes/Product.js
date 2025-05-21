import Route from "express";

import * as ProductController from "../controller/Product";
import asyncHandler from "../middlewares/asyncHandler";
import authorizeAdmin from "../middlewares/authorizeAdmin";
import upload from "../middlewares/productUpload";

const router = Route();

router.post(
  "/",
  authorizeAdmin,
  upload.fields([
    { name: "product_images", maxCount: 5 },
    { name: "variant_images", maxCount: 20 },
  ]),
  asyncHandler(ProductController.insertProduct)
);
router.put(
  "/",
  authorizeAdmin,
  upload.single("image"),
  asyncHandler(ProductController.updateProduct)
);
router.get("/", asyncHandler(ProductController.getProduct));
router.delete(
  "/",
  authorizeAdmin,
  asyncHandler(ProductController.deleteProduct)
);
router.get("/:id", asyncHandler(ProductController.getProductById));

router.get("/recommend/:id", asyncHandler(ProductController.recommendProduct));

export default router;
