import mongoose from "mongoose";
import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler.js";
import {
  removeFile,
  uploadMultipleFilesOnCloudinary,
} from "../helper/helper.js";
import { Student } from "../models/student.model.js";
import { loginWithJWT } from "../utils/loginUsingJwt.utils.js";
import { Faculty } from "../models/faculty.model.js";
import { User } from "../models/users.model.js";

// controller for register student or faculty.
export const register = asyncErrorHandler(async (req, res, next) => {
  const {
    email,
    username,
    password,
    roles,
    profile
  } = req.body;

  const avatar = req.file;

  // first we check if user is already registered or not.
  const existingUser = await User.findOne({$or: [{ email }, { username }] });

  if (existingUser) return next(new ErrorHandler("User already registered !", 400));

  let userModel;
  if(roles == 'student') userModel = Student;
  else if(roles == 'faculty') userModel = Faculty;
  else return next(new ErrorHandler("Invalid role !", 400));

  const userProfile = await userModel.create(profile);

  if (!avatar) return next(new ErrorHandler("Avatar is required !", 400));

  //upload avatar on cloudinary.
  const { success, results } = await uploadMultipleFilesOnCloudinary([avatar]);
  
  if (!success) return next(new ErrorHandler(results, 400));

  const public_id = results[0].public_id;
  const url = results[0].url;

  await removeFile([avatar]);

   // now we create user.
  await User.create({
    email,
    username,
    password,
    roles,
    rolesId : userProfile?._id,
    avatar : {
      public_id,
      url,
    }

  })

  res.status(200).json({
    success: true,
    message: "Student registered successfully !",
  });

});

// now we write controller for login student.
export const login = asyncErrorHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  // first we check student is registered or not.
  const student = await Student.findOne({
    $or: [{ email: email }, { username: username }],
  }).select("+password");

  // console.log(student);

  if (!student) return next(new ErrorHandler("Invalid credentials !", 400));

  // if student is registered the we compare the password.
  if (!(await student.comparePassword(password)))
    return next(new ErrorHandler("Invalid credentials !", 400));

  // if password is correct then we login the student.
  loginWithJWT(student, res);
});

// now we write controller for logout student.
export const logout = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie("tokenUser");
  req.user = undefined;
  res.cookie("tokenUser", undefined).status(200).json({
    success: true,
    message: "User logged out successfully.",
  });
});



// now we write controller for update the student avatar.
export const updateAvatar = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const avatar = req.file.path;

  if (!mongoose.isValidObjectId(id))
    return next(new ErrorHandler("Invalid user id !", 400));

  const student = await Student.findById(id);

  if (!student) return next(new ErrorHandler("User not found !", 404));

  // first we delete the existing avatar.
  if (student?.avatar?.public_id) {
    const { success, error } = await removeMultipleFileFromCloudinary([
      student?.avatar?.public_id,
    ]);

    if (!success) return next(new ErrorHandler(error, 400));
  }

  // now we upload new avatar on cloudinary.
  const { success, results } = await uploadMultipleFilesOnCloudinary([avatar]);

  if (!success) return next(new ErrorHandler(error, 400));

  const public_id = results[0].public_id;
  const url = results[0].url;

  const newStudent = await Student.findOneAndUpdate(
    { _id: id },
    { avatar: { public_id, url } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Avatar updated successfully !",
    data: newStudent,
  });
});

// now we write controller for updating the profile.
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
  const [myProfile] = await Student.aggregate([
    {
      $match : {
        _id : new mongoose.Types.ObjectId(req.user._id)
      }
    },
    {
      $lookup : {
        from : "collages",
        localField : "collage",
        foreignField : "_id",
        as : "collage",
        pipeline : [
            {
              $project : {
                collageName : 1,
                image : 1,
                _id : 0
              }
            }
        ]
      }
    },
    {
      $lookup : {
        from : "universities",
        localField : "university",
        foreignField : "_id",
        as : "university",
        pipeline : [
            {
              $project : {
                name : 1,
                image : 1,
                _id : 0
              }
            }
        ]
      }
    },
    {
      $lookup : {
        from : "branches",
        localField : "branch",
        foreignField : "_id",
        as : "branch",
        pipeline : [
            {
              $project : {
                branchName : 1,
                branchCode : 1,
                hodMentors : 1,
                headOfBranch : 1,
                _id : 0
              }
            }
        ]
      }
    },
    {
      $lookup : {
        from : "semesters",
        localField : "semester",
        foreignField : "_id",
        as : "semester",
        pipeline : [
          {
            $project : {
              semesterNumber : 1,
              totalCredits : 1,
              startDate : 1,
              endDate : 1,
            }
          }
        ]
      }
    },
    {
      $lookup : {
        from : 'classrooms',
        localField : 'classroom',
        foreignField : '_id',
        as : 'classroom',
        pipeline : [
          {
            $project : {
              classroomName : 1,
              topics : 1,
              _id : 0
            }
          }
        ]
      }
    },
    {
      $unwind : "$collage"
    },
    {
      $unwind : "$university"
    },
    {
      $unwind : "$branch"
    },
    {
      $unwind : "$semester"
    },
    {
      $unwind : "$classroom"
    },
    {
      $project : {
        firstName : 1,
        lastName : 1,
        email : 1,
        username : 1,
        avatar : 1,
        collage : 1,
        university : 1,
        branch : 1,
        semester : 1,
        classroom : 1
      }
    }
  ])

  if (!myProfile || myProfile.length === 0)
    return next(new ErrorHandler("Profile not found !", 404));

  res.status(200).json({
    success: true,
    message: "Profile fetched successfully !",
    data: myProfile,
  });

  
});
