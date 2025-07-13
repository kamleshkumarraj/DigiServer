import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true, "First name is required"],
        trim : true,
        max : [20 , "First name must be less than 20 characters"],
        min : [3, "First name must be more than 3 characters"]
    },
    lastName : {
        type : String,
        trim : true,
        max : [20 , "Last name must be less than 20 characters"],
        min : [3, "Last name must be more than 3 characters"]
    },
    
    collage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Collage",
        required : true
    },
    university : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "University",
        required : true
    },
    branch : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Branch",
        required : true
    },
    semester : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Semester",
        required : true
    },
    classroom : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Syllabus",
        required : true
    },
    section : {
        type : String,
        required : [true, "Section is required"],
        trim : true,
        max : [1, "Section must be less than 2 characters"],
        min : [1, "Section must be more than 0 characters"]
    },
    batch : {
        type : String,
        required : [true, "Batch is required"],
        trim : true,
        max : [2, "Batch must be less than 3 characters"],
        min : [1, "Batch must be more than 0 characters"]
    },
    
},{timestamps : true})

export const Student = mongoose.model("Student", studentSchema);