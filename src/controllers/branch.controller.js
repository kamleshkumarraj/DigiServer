import mongoose from "mongoose";
import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler.js";
import { Branch } from "../models/branch.model.js";
import { User } from "../models/users.model.js";

export const createBranch = asyncErrorHandler(async (req, res,  next) => {
    const data = req.body;
    console.log(data)
    // first we check in this particular collage this branch is exist or not.
    
    const branch = await Branch.findOne({collageId : data?.collageId , branchCode : data?.branchCode});

    if(branch) return next(new ErrorHandler("Already branch exists !",401));

    await Branch.create(data);

    res.status(200).json({
        success : true,
        message : "Branch registered successfully",
    })
}) 

// code for updating branch.
export const updateBranch = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)) return next(new ErrorHandler("Invalid branch id !",400));

    const branch = await Branch.findById(id);

    if(!branch) return next(new ErrorHandler("Branch doesn't exist !",404));

    const updatedBranch = await Branch.findByIdAndUpdate(id, req.body, {new : true});

    res.status(200).json({
        success : true,
        message : "Branch updated successfully !",
        data : updatedBranch
    })
})


// now we write code for deleting brach from collage.
export const deleteBranch = asyncErrorHandler(async (req, res, next) => {
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

// code for assign hod for branch.
export const assignHOD = asyncErrorHandler(async (req, res, next) => {
    const {branchId} = req.params;
    const {hodId} = req.body;
    console.log(hodId)
    if(!mongoose.isValidObjectId(branchId)) return next(new ErrorHandler("Invalid branch id !",400));

    const hod = await User.findById(hodId);
    if(!hod) return next(new ErrorHandler("HOD doesn't exist !",404));

    await Branch.findByIdAndUpdate(branchId, {headOfBranch : hodId});

    res.status(200).json({
        success : true,
        message : "HOD assigned successfully !",
    })
});

