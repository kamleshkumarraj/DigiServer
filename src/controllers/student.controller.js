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
  const [myProfile] = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },

    {
      $lookup: {
        from: "students",
        localField: "rolesId",
        foreignField: "id",
        as: "student",
        pipeline: [
          {
            $lookup: {
              from: "collages",
              localField: "collage",
              foreignField: "_id",
              as: "collage",
              pipeline: [
                {
                  $project: {
                    collageName: 1,
                    image: 1,
                    _id: 0,
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: "universities",
              localField: "university",
              foreignField: "_id",
              as: "university",
              pipeline: [
                {
                  $project: {
                    name: 1,
                    image: 1,
                    _id: 0,
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: "branches",
              localField: "branch",
              foreignField: "_id",
              as: "branch",
              pipeline: [
                {
                  $project: {
                    branchName: 1,
                    branchCode: 1,
                    hodMentors: 1,
                    headOfBranch: 1,
                    _id: 0,
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: "semesters",
              localField: "semester",
              foreignField: "_id",
              as: "semester",
              pipeline: [
                {
                  $project: {
                    semesterNumber: 1,
                    totalCredits: 1,
                    startDate: 1,
                    endDate: 1,
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: "classrooms",
              localField: "classroom",
              foreignField: "_id",
              as: "classroom",
              pipeline: [
                {
                  $project: {
                    classroomName: 1,
                    topics: 1,
                    _id: 0,
                  },
                },
              ],
            },
          },
          {
            $unwind: "$collage",
          },
          {
            $unwind: "$university",
          },
          {
            $unwind: "$branch",
          },
          {
            $unwind: "$semester",
          },
          {
            $unwind: "$classroom",
          },
          {
            $project: {
              firstName: 1,
              lastName: 1,
              collage: 1,
              university: 1,
              branch: 1,
              semester: 1,
              classroom: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$student",
    },
    {
      $project: {
        email: 1,
        username: 1,
        avatar: 1,
        student: 1,
      },
    },
  ]);

  if (!myProfile || myProfile.length === 0)
    return next(new ErrorHandler("Profile not found !", 404));

  res.status(200).json({
    success: true,
    message: "Profile fetched successfully !",
    data: myProfile,
  });
});
