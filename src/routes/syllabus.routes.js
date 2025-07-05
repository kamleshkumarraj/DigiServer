import { Router } from "express";
import { createCourse } from "../controllers/course.controller.js";

export const syllabusRouter = Router();

syllabusRouter.route("/create-syllabus").post(createCourse);