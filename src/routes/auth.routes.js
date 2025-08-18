import {Router} from "express";
import { login, logout, register, updateAvatar } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/uploadFile.js";

export const authRouter = Router();

authRouter.route("/register").post(upload.single("avatar"), register);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);
authRouter.route("/update-avatar").patch(updateAvatar);