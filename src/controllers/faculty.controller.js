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

// now we write controller for login faculty.
export const loginFaculty = asyncErrorHandler(async (req, res, next) => {
    const {username, email, password} = req.body;

    // first we check faculty is registered or not.
    const faculty = await Faculty.findOne({$or : [{email, username}]}).select("+password");

    if(!faculty) return next(new ErrorHandler("Invalid credentials !",400));

    // if faculty is registered the we compare the password.
    if(! (await faculty.comparePassword(password))) return next(new ErrorHandler("Invalid credentials !",400)); 

    // if password is correct then we login the faculty.
    loginWithJWT(faculty, res);
})

// now we write the controller for logout the faculty.
export const logoutFaculty = asyncErrorHandler(async (req, res, next) => {
    res.clearCookie('token');
    req.user = undefined;
    res.cookie('token',undefined).status(200).json({
        success: true,
        message: "User logged out successfully."
    })
})

// now we write controller for get the faculty profile.
export const getMyProfileFaculty = asyncErrorHandler(async (req, res, next) => {
    const myProfile = await Faculty.findById(req?.user);
    
    res.status(200).json({
        success : true,
        message : "My Profile",
        data : myProfile
    })
})