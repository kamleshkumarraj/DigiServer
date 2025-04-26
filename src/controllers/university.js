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
export const updateUniversity = asyncErrorHandler