import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    branchName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true
    },
    departmentIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }],
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
