import { Router } from "express";

import * as CartController from "../controller/Cart";
import asyncHandler from "../middlewares/asyncHandler";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.post("", verifyToken, asyncHandler(CartController.insertItem));
router.get("", verifyToken, asyncHandler(CartController.getCart));
router.delete("/:id", verifyToken, asyncHandler(CartController.deleteCartItem));

export default router;
