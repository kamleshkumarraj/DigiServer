import mongoose from "mongoose";
import { asyncErrorHandler } from "../errors/asynError.js";
import { User } from "../models/users.model.js";
import { ErrorHandler } from "../errors/errorHandler.js";

export const getParentProfile = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user;

  const [parentProfile] = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "parents",
        localField: "rolesId",
        foreignField: "_id",
        as: "parentProfile",
        pipeline: [
          {
            $addFields: {
              fullName: { $concat: ["$firstName", " ", "$lastName"] },
            },
          },

          {
            $project: {
              fullName: 1,
              phoneNumber: 1,
              contactInfo: 1,
              gender: 1,
              bio: 1,
              age: 1,
              child: 1,
              occupation: 1,
              relationship: 1,
            },
          },
        ],
      },
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
    {
      $unwind: "$parentProfile",
    },
    {
      $unwind: "$contactInfo",
    },
    {
      $project: {
        email: 1,
        username: 1,
        role: 1,
        parentProfile: 1,
        avatar: 1,
        contactInfo: 1,
      },
    },
  ]);

  // now we get children for

  if (!parentProfile)
    return next(new ErrorHandler("Parent profile not found !", 404));

  res.status(200).json({
    success: true,
    message: "Parent profile fetched successfully !",
    data: parentProfile,
  });
});

// now we write code for get all children profile for parent.
export const getAllChildren = asyncErrorHandler(async (req, res, next) => {
  const parentId = req.user;
  const parent = await User.findById(parentId).populate({
    path: "rolesId",
    select: "child",
  });
  const childArray = parent?.rolesId?.child || [];
  if (childArray.length === 0) {
    return next(new ErrorHandler("No children found for this parent !", 404));
  }

  // create child id as valid mongoose ObjectId
  const validChildId = childArray.map((id) => new mongoose.Types.ObjectId(id));
  const children = await User.aggregate([
    {
      $match: {
        _id: {
          $in: validChildId,
        },
      },
    },
    {
      $lookup: {
        from: "students",
        localField: "rolesId",
        foreignField: "_id",
        as: "studentProfile",
        pipeline: [
          {
            $lookup: {
              from: "batches",
              localField: "batch",
              foreignField: "_id",
              as: "batch",
              pipeline: [
                {
                  $project: {
                    batchName: 1,
                    _id: 0,
                  },
                },
              ],
            },
          },
          { $unwind: "$batch" },
          {
            $addFields: {
              fullName: { $concat: ["$firstName", " ", "$lastName"] },
            },
          },
          {
            $project: {
              fullName: 1,
              rollNumber: 1,
              dateOfBirth: 1,
              phoneNumber: 1,
              contactInfo: 1,
              gender: 1,
              section: 1,
              batch: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$studentProfile" },
    {
      $project: {
        email: 1,
        username: 1,
        role: 1,
        studentProfile: 1,
        avatar: 1,
      },
    },
  ]);
  res.status(200).json({
    success: true,
    message: "Children fetched successfully !",
    data: children,
  });
});
