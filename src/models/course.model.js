import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    classroomId : {
        type : mongoose.Schema.ObjectId,
        ref : "Classroom"
    },
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
        enum: ["Core", "Elective", "Lab"]
    },
    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },
    // studentsEnrolled: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Student"
    // }],
    
},{timestamps : true});

export const Course = mongoose.model("Course", courseSchema);
