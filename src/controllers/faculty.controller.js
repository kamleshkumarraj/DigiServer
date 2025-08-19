import mongoose from "mongoose";
import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler.js";
import { Faculty } from "../models/faculty.model.js";
import { User } from "../models/users.model.js";



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
// now we write controller for get the faculty profile.
export const getFacultyProfile = asyncErrorHandler(async (req, res, next) => {
    const id = req.user;

    const [faculty] = await User.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup : {
                from : "faculties",
                localField : "rolesId",
                foreignField : "_id",
                as : "profile",
                pipeline : [
                    {
                        $addFields : {
                            fullName : "$firstName + ' ' + $lastName"
                        }
                    },
                    {
                        $project : {
                            fullName : 1,
                            employeeId : 1,
                            bio : 1,
                            specialization : 1,
                            phoneNumber : 1
                        }
                    }
                ]
            }
        },
        {
            $unwind : "$profile"
        },
        {
            $project : {
                email : 1,
                username : 1,
                profile : 1,
                avatar : 1,
                role : 1
            }
        }
    ])

    if(!faculty) return next(new ErrorHandler("Faculty not found !",404));

    res.status(200).json({
        success: true,
        message: "Faculty profile fetched successfully !",
        data: faculty
    })
})