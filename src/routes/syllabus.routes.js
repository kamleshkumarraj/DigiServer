import { Router } from "express";
import { isHOD, isLoggedIn } from "../middlewares/auth.middleware.js";
import { registerSyllabus } from "../controllers/syllabus.controller.js";

export const syllabusRouter = Router();

syllabusRouter
  .route("/register-syllabus")
  .post(isLoggedIn, isHOD, registerSyllabus);
