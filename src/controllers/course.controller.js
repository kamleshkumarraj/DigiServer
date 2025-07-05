import { asyncErrorHandler } from "../errors/asynError.js";
import { Course } from "../models/course.model.js";

export const createCourse = asyncErrorHandler(async (req, res, next) =>{
    const { courseName, courseCode, description, credits, courseType, assignTo, } = req.body;

    const isExist = await Course.findOne({courseCode});

    if(isExist) {
        return next(new ErrorHandler("Course is already exists", 400));
    }

    const newCourse = await Course.create({
        courseCode, courseName, description, credits, courseType, assignTo,
        createdBy: req.faculty._id
    });

    res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: newCourse
    });
})

// now we write 