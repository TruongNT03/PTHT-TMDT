import { Router } from "express";

import authorization from "../middlewares/authorization";
import asyncHandler from "../middlewares/asyncHandler";
import * as AddressController from "../controller/Address";

const route = Router();

route.post("/", authorization, asyncHandler(AddressController.newAddress));
route.get("/", authorization, asyncHandler(AddressController.getAddress));

export default route;
