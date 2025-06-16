import { asyncErrorHandler } from "../errors/asynError.js";
import { Classroom } from "../models/classroom.model.js";

export const createClassroom = asyncErrorHandler(async (req, res, next) => {
    const {branchId, semesterId, classroomName, classroomCode} = req.body;
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
    })

    res.status(201).json({
        success: true,
        message: "classroom created successfully",
    });
})