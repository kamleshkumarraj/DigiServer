import mongoose from "mongoose";

const courseWorkSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    courseWork : [
        {
            resource_type : String,
            resource_url : String
        }
    ],
    resource : {
        resource_type: String,
        resource_url : String
    },
    assignment : {
        resource_type: String,
        resource_url : String
    },
    // quizz : {
    //     resource_type: String,
    //     resource_url : String
    // }

},{timestamps : true});