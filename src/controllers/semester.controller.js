import mongoose from "mongoose";
import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler.js";
import { Semester } from "../models/semester.model.js";

export const createSemester = asyncErrorHandler(async (req, res, next) => {
    const {branchId, semesterNumber, totalCredits, startDate, endDate, semesterCode, collageId} = req.body;

    // first we check semester is exists or not in this particular branch.
    const semester = await Semester.findOne({semesterCode});

    if(semester) return next(new ErrorHandler("Semester already exists !",400));

    const newSemester = await Semester.create({branchId, semesterNumber, totalCredits, startDate, endDate, semesterCode, collageId});

    res.status(200).json({
        success : true,
        message : "Semester created successfully !",
    })
})

// now we write controller for updating semester.
export const updateSemester = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;

    if(!mongoose.isValidObjectId(id)) return next(new ErrorHandler("Invalid Semester Id",400));

    const semester = await Semester.findOne({_id : id});

    if(!semester) return next(new ErrorHandler("Semester doesn't exists !",404));

    const newSemester = await Semester.findByIdAndUpdate({_id : id}, data, {new : true, runValidators: true});

    res.status(200).json({
        success : true,
        message : "Semester updated successfully !",
        data : newSemester
    })
})

// now we write code for deleting the semester.
export const deleteSemester = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id;

    if(!mongoose.isValidObjectId(id)) return next(new ErrorHandler("Invalid Semester Id",400));

    await Semester.findByIdAndDelete(id);

    res.status(200).json({
        success : true,
        message : "Semester deleted successfully !"
    })
})

// now we write controller for getting all semesters from specific branch.
export const getAllSemester = asyncErrorHandler(async (req, res, next) => {
    const branchId = req.params.branchId;
    const semesters = await Semester.find({branchId});
    res.status(200).json({
        success : true,
        message : "Semesters fetched successfully !",
        data : semesters
    })
})