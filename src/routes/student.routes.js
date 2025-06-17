import { Router } from "express";
import { login, register } from "../controllers/studentAuth.controller.js";
import { upload } from "../middlewares/uploadFile.js";

export const studentRouter = Router();

studentRouter.route("/register").post(upload.single("avatar"),register)
studentRouter.route('/login').post(login)