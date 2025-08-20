import { asyncErrorHandler } from "../errors/asynError.js";
import { ContactInfo } from "../models/contactInfo.model.js";

export const createContact = asyncErrorHandler(async (req, res, next) => {
    const {address, state, country, zipCode, parentPhoneNumber, emergencyContact, city, district, userId} = req.body;
    // const userId = req.user._id;

    await ContactInfo.create({address, state, country, zipCode, parentPhoneNumber, emergencyContact, userId, city, district});

    res.status(201).json({
        status: "success",
        message: "Contact info created successfully !"
    });
})

export const updateContact = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;

    const contactInfo = await ContactInfo.findById(id);
    if(contactInfo?.userId?.toString() !== req?.user?.toString()) {
        return next(new ErrorHandler("You are not authorized to update this contact info !", 403));
    }

    await ContactInfo.findByIdAndUpdate(id, data, {runValidators : true});

    res.status(200).json({
        status : "success",
        message : "Contact info updated successfully !"
    })
})

export const deleteContact = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id;
    const contactInfo = await ContactInfo.findById(id);
    if(contactInfo?.userId?.toString() !== req?.user?.toString()) {
        return next(new ErrorHandler("You are not authorized to update this contact info !", 403));
    }

    await ContactInfo.findByIdAndDelete(id);
    res.status(200).json({
        status : "success",
        message : "Contact info deleted successfully !"
    })
})