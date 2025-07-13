import { Router } from "express";
import { getMyProfile } from "../controllers/student.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

export const studentRouter = Router();
studentRouter.route("/my-profile").get(isLoggedIn ,getMyProfile);

