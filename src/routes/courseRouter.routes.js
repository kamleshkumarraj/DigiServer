import { Router } from "express";
import { isHOD, isLoggedIn } from "../middlewares/auth.middleware.js";
import { createCourse } from "../controllers/course.controller.js";

export const courseRouter = Router();

courseRouter.route("/create-course").post(isLoggedIn, isHOD, createCourse);