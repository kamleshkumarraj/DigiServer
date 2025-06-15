import mongoose, { isValidObjectId, mongo } from "mongoose";
import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler.js";
import { Collage } from "../models/Collage.model.js";
import { removeMultipleFileFromCloudinary, uploadMultipleFilesOnCloudinary } from "../helper/helper.js";


// code for creating new Collage
export const createCollage = asyncErrorHandler(async (req, res, next) => {
    const data = req.body;
    const collage = await Collage.findOne({ registrationId : data.registrationId });
    if(collage){
        return next(new ErrorHandler("Collage already registered !",400));
    }

    await Collage.create(data);

    res.status(200).json({
        success : true,
        message : "Collage registered successfully"
    }) 
    
})

// now we write code for update Collage.
export const updateCollage = asyncErrorHandler(async (req, res, next) => {
    const data = req.body;
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)) return next(new ErrorHandler("Invalid Collage Id",400));

    const collage = await Collage.findOne({ registrationId : data.registrationId });

    if(!collage) return next(new ErrorHandler("Collage not found !",404));

    const newCollage = Collage.findOneAndUpdate({ registrationId : data.registrationId }, data, { new : true });

    res.status(200).json({
        success : true, 
        message : "Collage updated successfully",
        data : newCollage
    })

})

// now we write code for update CollageId.
export const updateCollageId = asyncErrorHandler(async (req, res, next) => {
    const {oldRegistrationId, newRegistrationId} = req.body;
    const id = req.params.id;
    
    if(!mongoose.isValidObjectId(id)) return next(new ErrorHandler("Invalid Collage Id",400));

    const collage = await Collage.findOne({_id : id});

    if(!collage) return next(new ErrorHandler("Collage not found !",404));

    if(! (await collage.compareRegistrationId(oldRegistrationId, newRegistrationId))) return next(new ErrorHandler("Invalid Collage Id",400));

    const newCollage = Collage.findOneAndUpdate({ _id : id }, { registrationId : newRegistrationId }, { new : true });

    res.status(200).json({
        success : true,
        message : "Collage Id updated successfully",
        data : newCollage
    })

})

// now we write code for update Collage image.
export const updateCollageImage = asyncErrorHandler(async (req, res, next) => {
    const {id} = req.params;
    const image = req.file.path;

    if(!isValidObjectId(id)) return next(new ErrorHandler("Invalid Collage Id",400));

    const collage = await Collage.findOne({ _id : id });

    if(!collage) return next(new ErrorHandler("Collage not found !",404));

    // first we delete old image from cloudinary.
    if(collage?.image?.public_id){
        const {success, error} =  await removeMultipleFileFromCloudinary([collage?.image?.public_id]);

        if(!success) return next(new ErrorHandler(error , 400));
    }

    // now we upload new image on cloudinary;
    const {success, results} = await uploadMultipleFilesOnCloudinary([image]);

    if(!success) return next(new ErrorHandler(error,400));
    
    const public_id = results[0].public_id;
    const url = results[0].url;

    const newCollage = await Collage.findOneAndUpdate({ _id : id }, { image : {public_id , url} }, { new : true });

    res.status(200).json({
        success : true,
        message : "Collage image updated successfully",
        data : newCollage
    })
});