import { Router } from "express";
import { register } from "../controllers/studentAuth.controller.js";

export const studentRouter = Router();

studentRouter.route("/register").post(register)