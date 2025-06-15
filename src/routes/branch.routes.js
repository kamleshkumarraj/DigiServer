import { Router } from "express";
import { createBranch, deleteBranch, getAllBranch, getSingleBranch, updateBranch } from "../controllers/branch.controller.js";

export const branchRouter = Router();

branchRouter.route("/register-branch").post(createBranch);
branchRouter.route("/update-branch/:id").put(updateBranch);
branchRouter.route("/delete-branch/:id").delete(deleteBranch);
branchRouter.route("/get-all-branch/:collageId").get(getAllBranch);
branchRouter.route("/get-single-branch/:id").get(getSingleBranch);
