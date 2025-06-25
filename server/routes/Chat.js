import { Router } from "express";

import * as ChatController from "../controller/Chat";
import asyncHandler from "../middlewares/asyncHandler";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.post("/", verifyToken, asyncHandler(ChatController.createRoom));
router.get("/", verifyToken, asyncHandler(ChatController.getMessageLog));

export default router;
