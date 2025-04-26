import mongoose, { mongo } from "mongoose";
import { asyncErrorHandler } from "../errors/asynError";
import { ErrorHandler } from "../errors/errorHandler";
import { University } from "../models/university.model";


// code for creating new university
export const createUniversity = asyncErrorHandler(async (req, next, next) => {
    const data = req.body;
    const university = await University.findOne({ registrationId : data.registrationId });

    if(university){
        return next(new ErrorHandler("University already registered !",400));
    }

    await University.create(data);

    res.status(200).json({
        success : true,
        message : "University registered successfully"
    }) 
    
})

// now we write code for update university.
export const updateUniversity = asyncErrorHandler(async (req, res, next) => {
    const data = req.body;
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)) return next(new ErrorHandler("Invalid University Id",400));

    const university = await University.findOne({ registrationId : data.registrationId });

    if(!university) return next(new ErrorHandler("University not found !",404));

    const newUniversity = University.findOneAndUpdate({ registrationId : data.registrationId }, data, { new : true });

    res.status(200).json({
        success : true, 
        message : "University updated successfully",
        data : newUniversity
    })

})

// now we write code for update universityId.
export const updateUniversityId = asyncErrorHandler(async (req, res, next) => {
    const {oldRegistrationId, newRegistrationId} = req.body;
    const id = req.params.id;
    
    if(!mongoose.isValidObjectId(id)) return next(new ErrorHandler("Invalid University Id",400));

    const university = await University.findOne({_id : id});

    if(!university) return next(new ErrorHandler("University not found !",404));

    if(! (await university.compareUniversityId(oldRegistrationId, newRegistrationId))) return next(new ErrorHandler("Invalid University Id",400));

    const newUniversity = University.findOneAndUpdate({ _id : id }, { registrationId : newRegistrationId }, { new : true });

    res.status(200).json({
        success : true,
        message : "University Id updated successfully",
        data : newUniversity
    })

})