import { Router } from "express";
import { upload } from "../middlewares/uploadFile.js";
import {
  createCollage,
  updateCollage,
  updateCollageId,
  updateCollageImage,
} from "../controllers/collage.controller.js";

export const collageRouter = Router();

collageRouter
  .route("/register-collage")
  .post(upload.single("image"), createCollage);

collageRouter
  .route("/update-collage/:id")
  .put(upload.single("image"), updateCollage);

collageRouter.route("/update-collage-id/:id").patch(updateCollageId);

collageRouter
  .route("/update-collage-image/:id")
  .patch(upload.single("image"), updateCollageImage);
