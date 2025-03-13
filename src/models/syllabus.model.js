import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semester",
        required: true
    },
    topics: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        topicsCovered: [String]  // List of topics for each course
    }],
   
},{timestamps : true});

export const Classroom = mongoose.model("Classroom", classroomSchema);
