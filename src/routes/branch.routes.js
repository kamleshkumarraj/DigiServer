import { Router } from "express";
import { assignHOD, createBranch, deleteBranch, getAllBranch, getSingleBranch, updateBranch } from "../controllers/branch.controller.js";
import { isHOD } from "../middlewares/auth.middleware.js";

export const branchRouter = Router();

branchRouter.route("/register-branch").post(createBranch);
branchRouter.route("/update-branch/:id").put(updateBranch);
branchRouter.route("/delete-branch/:id").delete(deleteBranch);
branchRouter.route("/get-all-branch/:collageId").get(getAllBranch);
branchRouter.route("/get-single-branch/:id").get(getSingleBranch);

branchRouter.route("/assign-hod/:branchId").put(isHOD,assignHOD);
