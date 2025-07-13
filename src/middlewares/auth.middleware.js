import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler.js";
import jwt from "jsonwebtoken";
import { Student } from "../models/student.model.js";
import { Faculty } from "../models/faculty.model.js";
import { User } from "../models/users.model.js";

export const isAdmin = asyncErrorHandler((req, res, next) => {
    if(req.user.role = 'Admin'){
        return next()
    }else{
        return next(new ErrorHandler("Only Admin can access this resources !",402))
    }
})

export const isTutor = asyncErrorHandler((req, res, next) => {
    if(req.user.role = 'Tutor'){
        return next()
    }else{
        return next(new ErrorHandler("Only Tutor can access this resources !",402))
    }
})

export const isHOD = asyncErrorHandler((req, res, next) => {
    if(req.faculty.role = 'HOD'){
        return next()
    }else{
        return next(new ErrorHandler("Only HOD can access this resources !",402))
    }
})

export const isProfessor = asyncErrorHandler((req, res, next) => {
    if(req.user.role = 'Professor'){
        return next()
    }else{
        return next(new ErrorHandler("Only Professor can access this resources !",402))
    }
})


export const isLoggedIn = asyncErrorHandler(async (req, res, next) => {
    
    const token = req.cookies?.token || req.headers?.authorization?.replace("Bearer ", "");
    
    if(!token) {
        return next(new ErrorHandler("Please login to access this resources !", 401));
    }

    const decodedId = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedId.id).select("-password -resetPasswordToken -resetPasswordExpiry");
    if(!user) return next(new ErrorHandler("User not found !", 404));

    req.user = user?._id;

    next();
})


