import { Router } from "express";
import { registerBatch } from "../controllers/batch.controller.js";

export const batchRouter = Router();

batchRouter.route("/register").post(registerBatch);