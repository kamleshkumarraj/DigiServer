import { Router } from "express";
import { createUniversity, updateUniversity, updateUniversityId, updateUniversityImage } from "../controllers/university.controller.js";
import { upload } from "../middlewares/uploadFile.js";

export const universityRouter = Router();

universityRouter.route("/create-university").post(upload.single('image'),createUniversity);
universityRouter.route("/update-university/:id").put(updateUniversity);
universityRouter.route("/update-university-id/:id").patch(updateUniversityId);
universityRouter.route("/update-university-image/:id").patch(updateUniversityImage);