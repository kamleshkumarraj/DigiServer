import { Router } from "express";
import {
  createSemester,
  deleteSemester,
  getAllSemester,
  updateSemester,
} from "../controllers/semester.controller.js";

export const semesterRouter = Router();

semesterRouter.route("/register-sem").post(createSemester);
semesterRouter.route("/update-sem/:id").put(updateSemester);
semesterRouter.route("/delete-sem/:id").delete(deleteSemester);
semesterRouter.route("/get-sem/:branchId").get(getAllSemester);
