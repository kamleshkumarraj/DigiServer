import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    branchName: {
        type: String,
        required: true,
        trim: true
    },
    branchCode: {
        type: String,
        required: true,
        uppercase: true
    },
    collageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true
    },
    headOfBranch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    },
    hodMentors : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Faculty"
    },
    totalSeats: {
        type: Number,
        required: true,
        default: 60
    },
    studentsEnrolled: {
        type: Number,
        default: 0
    },
    
    
},{timestamps : true});

export const Branch = mongoose.model("Branch", branchSchema);
