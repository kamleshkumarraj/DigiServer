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
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true,
        lowercase : true,

    },
    username : {
        type : String,
        required : [true, "Username is required"],
        unique : true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        min : [8, "Password must be more than 8 characters"],
        select : false
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
    syllabus : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Syllabus",
        required : true
    }
},{timestamps : true})