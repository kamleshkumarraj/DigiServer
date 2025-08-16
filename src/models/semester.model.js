import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema({
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    collageId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true
    },
    semesterNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    semesterCode : {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    totalCredits: {
        type: Number,
        required: true,
        default: 20  // Assuming each semester has 20 credits
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
},{timestamps : true});

export const Semester = mongoose.model("Semester", semesterSchema);
