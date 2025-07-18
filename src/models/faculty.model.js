import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true, "First name is required"],
        trim : true,
        max : [50 , "First name must be less than 50 characters"],
        min : [3, "First name must be more than 3 characters"]
    },
    lastName : {
        type : String,
        required : [true, "First name is required"],
        trim : true,
        max : [50 , "First name must be less than 50 characters"],
        min : [3, "First name must be more than 3 characters"]
    },
    role : {
        type : [String],
        required : [true, "Role is required"],
        enum : ["HOD", "HODMentor", "Professor", "Tutor", "Admin"]
    },
    employeeId : {
        type : String,
        required : [true, "Employee ID is required"],
        unique : true,
        max : [50 , "Employee ID must be less than 50 characters"],
        min : [3, "Employee ID must be more than 3 characters"],
        trim : true
    },
    collageId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "College"
    },
    branchId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Branch"
    }],
    semester : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Semester"
    }],
    
    university : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "University"
    },
    isActive : {
        type : Boolean,
        default : true
    },

}, {timestamps : true});

export const Faculty = mongoose.model("Faculty", facultySchema);