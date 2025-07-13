import { Router } from "express";
import { addSyllabus, createClassroom } from "../controllers/classroom.controller.js";

export const classroomRouter = Router();

classroomRouter.route("/create-classroom").post(createClassroom);
classroomRouter.route("/add-syllabus/:id").patch(addSyllabus);