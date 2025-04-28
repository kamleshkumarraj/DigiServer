import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler";
import { Semester } from "../models/semester.model.js";

export const createSemester = asyncErrorHandler(async (req, res, next) => {
    const {branchId, semesterNumber, totalCredits, startDate, endDate} = req.body;

    // first we check semester is exists or not in this particular branch.
    const semester = await Semester.findOne({branchId, semesterNumber});

    if(semester) return next(new ErrorHandler("Semester already exists !",400));

    const newSemester = await Semester.create({branchId, semesterNumber, totalCredits, startDate, endDate});

    res.status(200).json({
        success : true,
        message : "Semester created successfully !",
    })
})