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
        enum : ["HOD", "HOD Mentor", "Professor", "Tutor", "Admin", "faculty"]
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
    specialization : {
        type : String,
        required : [true, "Specialization is required"],
        trim : true,
        max : [50 , "Specialization must be less than 50 characters"],
        min : [3, "Specialization must be more than 3 characters"]
    },
    phoneNumber : {
        type : String,
        required : [true, "Phone number is required"],
        trim : true,
        max : [10, "Phone number must be less than 15 characters"],
        min : [10, "Phone number must be more than 9 characters"]
    },
    bio : {
        type : String,
        required : [true, "Bio is required"],
        trim : true,
        max : [500 , "Bio must be less than 500 characters"],
        min : [3, "Bio must be more than 3 characters"]
    },
    contactDetails :{ 
        type : mongoose.Schema.Types.ObjectId,
        ref : "Contact"
    },
    professionalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Professional"
    },
    joiningDate : {
        type : Date,
        required : [true, "Joining date is required"],
        default : Date.now
    },
    gender : {
        type : String,
        enum : ['Male', 'Female', 'Custom'],
        required  : true
    }

}, {timestamps : true});

export const Faculty = mongoose.model("faculty", facultySchema);