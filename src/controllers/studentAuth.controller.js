import mongoose from "mongoose";
import { asyncErrorHandler } from "../errors/asynError.js";
import { ErrorHandler } from "../errors/errorHandler.js";
import {
  removeFile,
  uploadMultipleFilesOnCloudinary,
} from "../helper/helper.js";
import { Student } from "../models/student.model.js";
import { loginWithJWT } from "../utils/loginUsingJwt.utils.js";

export const register = asyncErrorHandler(async (req, res, next) => {
  const {
    fistName,
    lastName,
    email,
    username,
    password,
    syllabus,
    semester,
    branch,
    university,
    collage,
  } = req.body;
  const avatar = req.file;

  // first we check student is already registered or not.
  const student = await Student.findOne({ $or: [{ email }, { username }] });

  if (student)
    return next(new ErrorHandler("Student already registered !", 400));

  // now we upload the avatar on cloudinary.
  const { success, results } = await uploadMultipleFilesOnCloudinary([avatar]);

  if (!success) return next(new ErrorHandler(error, 400));

  const public_id = results[0].public_id;
  const url = results[0].url;

  await removeFile([avatar]);

  const data = {
    fistName,
    lastName,
    email,
    username,
    password,
    syllabus,
    semester,
    branch,
    university,
    collage,
    avatar: {
      public_id,
      url,
    },
  };

  await Student.create(data);

  res.status(200).json({
    success: true,
    message: "Student registered successfully !",
  });
});

// now we write controller for login student.
export const login = asyncErrorHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // first we check student is registered or not.
  const student = await Student.findOne({ $or: [{ email, username }] }).select(
    "+password"
  );

  if (!student) return next(new ErrorHandler("Invalid credentials !", 400));

  // if student is registered the we compare the password.
  if (!(await student.comparePassword(password)))
    return next(new ErrorHandler("Invalid credentials !", 400));

  // if password is correct then we login the student.
  loginWithJWT(student, res);
});

// now we write controller for logout student.
export const logout = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie("token");
  req.user = undefined;
  res.cookie("token", undefined).status(200).json({
    success: true,
    message: "User logged out successfully.",
  });
});

export const getMyProfile = asyncErrorHandler(async (req, res, next) => {
  const myProfile = await Student.findById(req?.user);

  res.status(200).json({
    success: true,
    message: "My profile fetched successfully !",
    data: myProfile,
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
