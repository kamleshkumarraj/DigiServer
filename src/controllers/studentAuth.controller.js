import { asyncErrorHandler } from "../errors/asynError";
import { ErrorHandler } from "../errors/errorHandler";
import { uploadMultipleFilesOnCloudinary } from "../helper/helper";
import { Student } from "../models/student.model";

export const register = asyncErrorHandler(async (req, res, next) => {
  const {fistName, lastName, email, username, password, syllabus, semester, branch, university, collage} = req.body;
  const avatar = req.file.path;

  // first we check student is already registered or not.
  const student = await Student.findOne({$or : [{email}, {username}]});

  if(student) return next(new ErrorHandler("Student already registered !",400));

  // now we upload the avatar on cloudinary.
  const {success, results} = await uploadMultipleFilesOnCloudinary([avatar]);

  if(!success) return next(new ErrorHandler(error,400));

  const public_id = results[0].public_id;
  const url = results[0].url;

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
    avatar : {
        public_id,
        url
    }
  }

  await Student.create(data);

  res.status(200).json({
    success : true,
    message : "Student registered successfully !"
  })


})

// now we write controller for login student.
export const login = asyncErrorHandler(async (req, res, next) => {
  const {username, email, password} = req.body;

  // first we check student is registered or not.
  const student = await Student.findOne({$or : [{email, username}]}).select("+password");

  if(!student) return next(new ErrorHandler("Invalid credentials !",400));

  // if student is registered the we compare the password.
  if(! (await student.comparePassword(password))) return next(new ErrorHandler("Invalid credentials !",400));

  // if password is correct then we login the student.
  loginWithJWT(student, res);
})

// now we write controller for logout student.
export const logout = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie('token');
  req.user = undefined;
  res.cookie('token',undefined).status(200).json({
    success: true,
    message: "User logged out successfully."
  })
})

export const getMyProfile = asyncErrorHandler(async (req, res, next) => {
  const myProfile = await Student.findById(req?.user);

  res.status(200).json({
    success : true,
    message : "My profile fetched successfully !",
    data : myProfile
  })
})

// 