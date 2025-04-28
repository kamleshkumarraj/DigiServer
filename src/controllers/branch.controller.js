import { asyncErrorHandler } from "../errors/asynError";
import { ErrorHandler } from "../errors/errorHandler";
import { Branch } from "../models/branch.model";

export const createBranch = asyncErrorHandler(async (req, res,  next) => {
    const data = req.body;

    // first we check in this particular collage this branch is exist or not.
    const branchCode = data.branchId;
    const collageId = data.collageId;
    const branch = await Branch.findOne({collegeId , code : branchCode});

    if(branch) return next(new ErrorHandler("Already branch exists !",401));

    const newBranch = await Branch.create(data);

    res.status(200).json({
        success : true,
        message : "Branch registered successfully",
    })
}) 