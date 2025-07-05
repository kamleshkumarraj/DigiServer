import { Router } from "express";
import { createCourse } from "../controllers/syllabus.controller.js";
import { isFacultyLoggedIn, isHOD } from "../middlewares/auth.middleware.js";

export const syllabusRouter = Router();

syllabusRouter.route("/create-syllabus").post(isFacultyLoggedIn, isHOD, createCourse);