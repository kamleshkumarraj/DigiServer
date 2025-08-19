import { Router } from "express";
import { getParentProfile } from "../controllers/parent.controller.js";

export const parentRouter = Router();

parentRouter.route("/my-profile").get(getParentProfile);