import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler.js";
import { uploadMultipleFilesOnCloudinary } from "../helper/helper.js";

export const registerFaculty = asyncErrorHandler(async (req, res, next) => {
    const {firstName, lastName, email, username, password, collageId, semester, branchId, employeeId} = req.body;

    // first we check the faculty is already exists or not.
    const faculty = await Faculty.findOne({$or : [{email, username}]}).select("+password");

    if(faculty) return next(new ErrorHandler("Faculty already registered !",400));

    // first we upload the avatar of faculty on cloudinary.
    const avatar = req.file.path;
    const {success, results} = await uploadMultipleFilesOnCloudinary([avatar]);

    if(!success) return next(new ErrorHandler(error,400));

    const public_id = results[0].public_id;
    const url = results[0].url;


    const newFaculty = await Faculty.create({firstName, lastName, email, username, password, collageId, semester : [semester], branchId : [branchId], employeeId, avatar: {public_id, url}});

    res.status(200).json({
        success : true,
        message : "Faculty registered successfully !",
    })
})