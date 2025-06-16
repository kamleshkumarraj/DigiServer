import { Router } from "express";
import { register } from "../controllers/studentAuth.controller.js";
import { upload } from "../middlewares/uploadFile.js";

export const studentRouter = Router();

studentRouter.route("/register").post(upload.single("avatar"),register)