import {Router} from "express";
import { login, logout, register, updateAvatar } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);
authRouter.route("/update-avatar").patch(updateAvatar);