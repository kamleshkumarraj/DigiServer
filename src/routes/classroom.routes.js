import { Router } from "express";
import { createClassroom } from "../controllers/classroom.controller.js";

export const classroomRouter = Router();

classroomRouter.route("/create-classroom").post(createClassroom);