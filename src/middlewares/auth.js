import { asyncErrorHandler } from "../errors/asynError";
import { ErrorHandler } from "../errors/errorHandler";

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
    if(req.user.role = 'HOD'){
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

