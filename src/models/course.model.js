import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    credits: {
        type: Number,
        required: true,
        default: 3  // Default 3 credits per course
    },
    courseType: {
        type: String,
        required: true,
        enum: ["core", "elective", "lab"]
    },
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },
    
},{timestamps : true});

export const Course = mongoose.model("Course", courseSchema);
