import mongoose from "mongoose";
import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler.js";
import { Branch } from "../models/branch.model.js";

export const createBranch = asyncErrorHandler(async (req, res,  next) => {
    const {branchName, collageId, code, departmentIds,headOfBranch,hodMentors, totalSeats, studentsEnrolled } = req.body;

    // first we check in this particular collage this branch is exist or not.
    
    const branch = await Branch.findOne({collageId , code : branchCode});

    if(branch) return next(new ErrorHandler("Already branch exists !",401));

    const newBranch = await Branch.create({branchName, code, collegeId, departmentIds, headOfBranch, hodMentors, totalSeats, studentsEnrolled});

    res.status(200).json({
        success : true,
        message : "Branch registered successfully",
    })
}) 

// now we write code for deleting brach from collage.
export const deleteBranch = asyncErrorHandlers(async (req, res, next) => {
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)) return next(new ErrorHandler("Invalid branch id !",400));

    const branch = await Branch.findById(id);

    if(!branch) return next(new ErrorHandler("Branch doesn't exist !",404));

    await Branch.findByIdAndDelete(id);

    res.status(200).json({
        success : true,
        message : "Branch delete successfully !"
    })
})

// code for get all branch from specific collage.

export const getAllBranch = asyncErrorHandler(async (req, res, next) => {
    const collageId = req.params.collageId;

    const branches = await Branch.find(collageId);

    res.status(200).json({
        success : true,
        message : "Branches fetched successfully !",
        data : branches
    })
})

// code for getting single brach using branch id.

export const getSingleBranch = asyncErrorHandler(async (req, res, next) => {
     const branchId = req.params.id;

     const branch = await Branch.findById(branchId);
     
     res.status(200).json({
        success : true,
        message : "Branch fetched successfully !",
        data : branch
     })
})