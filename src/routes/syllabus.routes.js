import { Router } from "express";
import { createCourse } from "../controllers/syllabus.controller.js";
import { isHOD, isLoggedIn } from "../middlewares/auth.middleware.js";

export const syllabusRouter = Router();

syllabusRouter.route("/create-syllabus").post(isLoggedIn, isHOD, createCourse);