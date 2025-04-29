import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler.js";
import { uploadMultipleFilesOnCloudinary } from "../helper/helper.js";
import { Faculty } from "../models/faculty.model.js";

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

// now we write the controller for update the faculty avatar.
export const updateAvatarFaculty = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id;
    const avatar = req.file.path;

    if(!mongoose.isValidObjectId(id)) return next(new ErrorHandler("Invalid user id !",400));

    const faculty = await Faculty.findById(id);

    if(!faculty) return next(new ErrorHandler("User not found !",404));

    // first we delete the existing avatar.
    if(faculty?.avatar?.public_id){
        const {success, error} =  await removeMultipleFileFromCloudinary([faculty?.avatar?.public_id]);

        if(!success) return next(new ErrorHandler(error , 400));
    }

    // now we upload new avatar on cloudinary.
    const {success, results} = await uploadMultipleFilesOnCloudinary([avatar]);

    if(!success) return next(new ErrorHandler(error,400));
    
    const public_id = results[0].public_id;
    const url = results[0].url;

    const newFaculty = await Faculty.findOneAndUpdate({ _id : id }, { avatar : {public_id , url} }, { new : true });

    res.status(200).json({
        success : true,
        message : "Avatar updated successfully !",
        data : newFaculty
    })
})

// now we write controller for update the profile of faculty.
export const updateProfileFaculty = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id;
    const {firstName, lastName, email, username, password, collageId} = req.body;

    if(!mongoose.isValidObjectId(id)) return next(new ErrorHandler("Invalid user id !",400));

    const faculty = await Faculty.findById(id);

    if(!faculty) return next(new ErrorHandler("User not found !",404));

    const newFaculty = await Faculty.findOneAndUpdate({ _id : id }, {firstName, lastName, email, username, password, collageId, semester : [semester], branchId : [branchId], employeeId}, { new : true, runValidators : true});

    res.status(200).json({
        success : true,
        message : "Profile updated successfully !",
        data : newFaculty
    })
})

// now we write the controller for add the semester of faculty.
export const addSemesterFaculty = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id;
    const {semester} = req.body;

    if(!mongoose.isValidObjectId(id)) return next(new ErrorHandler("Invalid user id !",400));

    const faculty = await Faculty.findById(id);

    if(!faculty) return next(new ErrorHandler("User not found !",404));

    const newFaculty = await Faculty.findOneAndUpdate({ _id : id }, {semester : [...faculty?.semester, semester]}, { new : true, runValidators : true});

    // await Faculty.updateOne({_id : id}, {$push : {semester : semester}});

    res.status(200).json({
        success : true,
        message : "Semester added successfully !",
        data : newFaculty
    })
})

// now we write code for add the branch of faculty.
export const addBranchFaculty = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id;
    const {branchId} = req.body;

    if(!mongoose.isValidObjectId(id)) return next(new ErrorHandler("Invalid user id !",400));

    const faculty = await Faculty.findById(id);

    if(!faculty) return next(new ErrorHandler("User not found !",404));

    const newFaculty = await Faculty.findOneAndUpdate({ _id : id }, {branchId : [...faculty?.branchId, branchId]}, { new : true, runValidators : true});

    res.status(200).json({
        success : true,
        message : "Branch added successfully !",
        data : newFaculty
    })
})