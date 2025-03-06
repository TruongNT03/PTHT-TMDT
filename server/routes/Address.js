import { Router } from "express";

import authorization from "../middlewares/authorization";
import asyncHandler from "../middlewares/asyncHandler";
import * as AddressController from "../controller/Address";

const route = Router();

route.get("/", authorization, asyncHandler(AddressController.getAddress));
route.post("/", authorization, asyncHandler(AddressController.newAddress));
route.put("/", authorization, asyncHandler(AddressController.changeAddress));
route.delete("/", authorization, asyncHandler(AddressController.deleteAddress));

export default route;
