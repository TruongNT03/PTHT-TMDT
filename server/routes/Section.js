import Route from "express";

import * as SectionController from "../controller/Section";
import asyncHandler from "../middlewares/asyncHandler";
import authorizeAdmin from "../middlewares/authorizeAdmin";

const router = Route();

router.get("/", asyncHandler(SectionController.getSection));
router.post("/", authorizeAdmin, asyncHandler(SectionController.insertSection));
router.put("/", authorizeAdmin, asyncHandler(SectionController.updateSection));
router.delete(
  "/",
  authorizeAdmin,
  asyncHandler(SectionController.deleteSection)
);

export default router;
