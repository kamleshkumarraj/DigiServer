import { asyncErrorHandler } from "../errors/asynError.js";
import { Syllabus } from "../models/syllabus.models.js";

export const registerSyllabus = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user;
    const {syllabusName, branchId, semesterId, coreSubject, electiveSubject, labSubject} = req.body;

    await Syllabus.create({syllabusName, branchId, semesterId, coreSubject, electiveSubject, labSubject, createdBy : userId});

    res.status(201).json({
        status : "success",
        message : "Syllabus created successfully !"
    })
})