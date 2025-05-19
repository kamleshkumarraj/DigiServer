import { Router } from "express";
import { createUniversity, updateUniversity, updateUniversityId, updateUniversityImage } from "../controllers/university.controller.js";

export const universityRouter = Router();

universityRouter.route("/create-university").post(uplo,createUniversity);
universityRouter.route("/update-university/:id").put(updateUniversity);
universityRouter.route("/update-university-id/:id").patch(updateUniversityId);
universityRouter.route("/update-university-image/:id").patch(updateUniversityImage);