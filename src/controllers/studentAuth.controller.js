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