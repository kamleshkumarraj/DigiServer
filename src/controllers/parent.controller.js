import mongoose from "mongoose";
import { asyncErrorHandler } from "../errors/asynError.js";
import { User } from "../models/users.model.js";
import { ErrorHandler } from "../errors/errorHandler.js";

export const getParentProfile = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user;

    const [parentProfile] = await User.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup : {
                from : "parents",
                localField : "rolesId",
                foreignField : "_id",
                as : "parentProfile",
                pipeline : [
                    {
                        $addFields : {
                            fullName: { $concat: ["$firstName", " ", "$lastName"] },
                        }
                    },
                    {
                        $project : {
                            fullName : 1,
                            phoneNumber : 1,
                            contactInfo : 1,
                            gender : 1,
                            bio : 1,
                            age : 1,
                            child : 1,

                        }
                    }
                ]
            }
        },
        {
            $unwind : "$parentProfile"
        },
        {
            $project : {
                email : 1,
                username : 1,
                role : 1,
                parentProfile : 1,
                avatar : 1
            }
        }
    ])

    if(!parentProfile) return next(new ErrorHandler("Parent profile not found !", 404));

    res.status(200).json({
        success: true,
        message: "Parent profile fetched successfully !",
        data: parentProfile
    });
})