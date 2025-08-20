import mongoose from "mongoose";
import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler.js";
import { Student } from "../models/student.model.js";
import { User } from "../models/users.model.js";

export const updateProfile = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  if (!mongoose.isValidObjectId(id))
    return next(new ErrorHandler("Invalid user id !", 400));

  const student = await Student.findById(id);

  if (!student) return next(new ErrorHandler("User not found !", 404));

  const newStudent = await Student.findOneAndUpdate({ _id: id }, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Profile updated successfully !",
    data: newStudent,
  });
});

// now we write controller for delete the student profile from db.
export const deleteProfile = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return next(new ErrorHandler("Invalid user id !", 400));

  const student = await Student.findById(id);
  if (!student) return next(new ErrorHandler("User not found !", 404));

  await Student.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Profile deleted successfully !",
  });
});

// code for fetching complete student profile.

export const getMyProfile = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user;

  const [studentProfile] = await User.aggregate([
    {
      $match : {_id : new mongoose.Types.ObjectId(userId)}
    },
    {
      $lookup : {
        from : "students",
        localField : "rolesId",
        foreignField : "_id",
        as : "studentProfile",
        pipeline: [
          {
            $lookup : {
              from : 'batches',
              localField : "batch",
              foreignField : "_id",
              as : "batch",
              pipeline : [
                {
                  $project : {
                    batchName : 1,
                    _id : 0
                  }
                }
              ]
            }
          },
          {$unwind : "$batch"},
          {
            $addFields : {
              fullName: { $concat: ["$firstName", " ", "$lastName"] },
            }
          },
          {
            $project : {
              fullName : 1,
              rollNumber : 1,
              dateOfBirth : 1,
              phoneNumber : 1,
              contactInfo : 1,
              gender : 1,
              section : 1,
              batch : 1,
            }
          }
        ]
      }
    },
    {
      $lookup : { 
        from : "contacts",
        localField : "_id",
        foreignField : "userId",
        as : "contactInfo",
        pipeline : [
          {
            $project : {
              address : 1,
              state : 1,
              country : 1,
              zipCode : 1,
              parentPhoneNumber : 1,
              emergencyContact : 1,
              city : 1,
              district : 1
            }
          }
        ]
      }
    },
    {$unwind : "$studentProfile"},
    {$unwind : "$contactInfo"},
    {$project : {
      email : 1,
      username : 1,
      role : 1,
      studentProfile : 1,
      avatar : 1,
      contactInfo : 1,
    }}
  ])

  if(!studentProfile) return next(new ErrorHandler("Profile not found !", 404));

  res.status(200).json({
    success : true,
    message : "Profile fetched successfully !",
    data : studentProfile
  })

})