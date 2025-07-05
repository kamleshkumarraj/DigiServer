import { Router } from "express";
import { getMyProfile, login, register } from "../controllers/studentAuth.controller.js";
import { upload } from "../middlewares/uploadFile.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

export const studentRouter = Router();

studentRouter.route("/register").post(upload.single("avatar"),register)
studentRouter.route('/login').post(login);
studentRouter.route('/get-my-profile').get(isLoggedIn, getMyProfile);