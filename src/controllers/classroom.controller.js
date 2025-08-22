import mongoose from "mongoose";
import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler.js";
import { Classroom } from "../models/classroom.model.js";

export const createClassroom = asyncErrorHandler(async (req, res, next) => {
    const {branchId, semesterId, classroomName, classroomCode, facultyId} = req.body;
    // Validate the input data
    if (!branchId || !semesterId || !classroomName || !classroomCode) {
        return next(new ErrorHandler("Branch ID and Semester ID are required", 400));
    }

    const isExists = await Classroom.findOne({branchId, semesterId, classroomCode});

    if (isExists) {
        return next(new ErrorHandler("Classroom with this code already exists in this branch and semester", 400));
    }
    // Create the classroom entry
    await Classroom.create({
        branchId,
        semesterId,
        classroomName,
        classroomCode,
        facultyId
    })

    res.status(201).json({
        success: true,
        message: "classroom created successfully",
    });
})

// now we write controller for add course in classroom.
export const addSyllabus = asyncErrorHandler(async (req, res, next) => {
    const classroomId = req.params.id;
    const syllabusId = req.body.syllabusId;
    if(!mongoose.isValidObjectId(classroomId)) return next(new ErrorHandler("Invalid classroom id !", 400));

    if(!mongoose.isValidObjectId(syllabusId)) return next(new ErrorHandler("Invalid syllabus id !", 400));

    await Classroom.findByIdAndUpdate(classroomId, {$set : {syllabus : syllabusId}});

    res.status(200).json({
        success: true,
        message: "Classroom updated successfully !"
    })
})