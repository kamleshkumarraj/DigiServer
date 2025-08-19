import { Router } from "express";
import { getAllChildren, getParentProfile } from "../controllers/parent.controller.js";
import { isLoggedIn, isParent } from "../middlewares/auth.middleware.js";

export const parentRouter = Router();

parentRouter.route("/my-profile").get(isLoggedIn, isParent, getParentProfile);
parentRouter.route("/get-all-children").get(isLoggedIn, isParent, getAllChildren)