import mongoose from "mongoose";
import { asyncErrorHandler } from "../errors/asynError.js";
import { Course } from "../models/course.model.js";
import { Classroom } from "../models/classroom.model.js";

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
    });
})

// now we write code for updating course and name.

export const updateCourse = asyncErrorHandler(async (req, res, next) => {
    const courseId = req.params.id;
    const courseData = req.body;

    if(!mongoose.isValidObjectId(courseId)) return next(new ErrorHandler("Invalid course id !", 400));

    // first we remove courseCode property from courseData if it exists
    if(courseData.courseCode) {
        delete courseData.courseCode;
    }

    await Course.findByIdAndUpdate(courseId, courseData, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: "Course updated successfully !"
    })
})

// now we write controller for deleting course.

export const deleteCourse = asyncErrorHandler(async (req, res, next) => {
    const courseId = req.params.id;

    if(!mongoose.isValidObjectId(courseId)) return next(new ErrorHandler("Invalid course id !", 400));

    // we will also delete this course id from classroom.
    await Classroom.updateOne({"topics.courseId" : courseId} , {$pull : {topics : {courseId}}});

    await Course.findByIdAndDelete(courseId);

    res.status(200).json({
        success: true,
        message: "Course deleted successfully !"
    })
})