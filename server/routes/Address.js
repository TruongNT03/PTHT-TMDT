import { Router } from "express";

import verifyToken from "../middlewares/verifyToken";
import asyncHandler from "../middlewares/asyncHandler";
import * as AddressController from "../controller/Address";

const route = Router();

route.get("/", verifyToken, asyncHandler(AddressController.getAddress));
route.post("/", verifyToken, asyncHandler(AddressController.insertAddress));
route.put("/", verifyToken, asyncHandler(AddressController.updateAddress));
route.delete("/", verifyToken, asyncHandler(AddressController.deleteAddress));

export default route;
