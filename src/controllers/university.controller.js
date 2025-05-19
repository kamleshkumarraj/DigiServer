import mongoose, { isValidObjectId, mongo } from "mongoose";
import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler.js";
import { University } from "../models/university.model.js";
import { removeMultipleFileFromCloudinary, uploadMultipleFilesOnCloudinary } from "../helper/helper.js";


// code for creating new university
export const createUniversity = asyncErrorHandler(async (req, res, next) => {
    const data = req.body;
    // first we upload image on cloudinary.
    const imagePath = req?.file?.path;
    const {success, results} = await uploadMultipleFilesOnCloudinary([imagePath]);
    if(!success) return next(new ErrorHandler(results, 400));

    const public_id = results[0].public_id;
    const url = results[0].url;
    data.image = {public_id, url};
    
    // now we check if university already exists or not.
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

// now we write code for update university image.
export const updateUniversityImage = asyncErrorHandler(async (req, res, next) => {
    const {id} = req.params;
    const image = req.file.path;

    if(!isValidObjectId(id)) return next(new ErrorHandler("Invalid University Id",400));

    const university = await University.findOne({ _id : id });

    if(!university) return next(new ErrorHandler("University not found !",404));

    // first we delete old image from cloudinary.
    if(university?.image?.public_id){
        const {success, error} =  await removeMultipleFileFromCloudinary([university?.image?.public_id]);

        if(!success) return next(new ErrorHandler(error , 400));
    }

    // now we upload new image on cloudinary;
    const {success, results} = await uploadMultipleFilesOnCloudinary([image]);

    if(!success) return next(new ErrorHandler(error,400));
    
    const public_id = results[0].public_id;
    const url = results[0].url;

    const newUniversity = await University.findOneAndUpdate({ _id : id }, { image : {public_id , url} }, { new : true });

    res.status(200).json({
        success : true,
        message : "University image updated successfully",
        data : newUniversity
    })
});