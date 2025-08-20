import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true, "First name is required"],
        trim : true,
        max : [50 , "First name must be less than 50 characters"],
        min : [3, "First name must be more than 3 characters"]
    },
    lastName : {
        type : String,
        required : [true, "Last name is required"],
        trim : true,
        max : [50 , "Last name must be less than 50 characters"],
        min : [3, "Last name must be more than 3 characters"]
    },
    phoneNumber : {
        type : String,
        required : [true, "Phone number is required"],
        trim : true,
        max : [10, "Phone number must be less than 15 characters"],
        min : [10, "Phone number must be more than 10 characters"]
    },
    gender : {
        type : String,
        required : [true, "Gender is required"],
        enum : ['male', 'female', 'custom']
    },
    age : {
        type : Number,
        required : [true, "Age is required"],
        min : [1, "Age must be more than 0"],
        max : [100, "Age must be less than 100"]
    },
    bio : {
        type : String,
        required : [true, "Bio is required"],
        trim : true,
        max : [500 , "Bio must be less than 500 characters"],
        min : [3, "Bio must be more than 3 characters"]
    },
    child : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true, "Child is required"]
    }],
    collageId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "College"
    },
    universityId : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "University"
    },
    occupation : {
        type : String,
        required : [true, "Occupation is required"],
        trim : true,
        max : [50 , "Occupation must be less than 50 characters"],
        min : [3, "Occupation must be more than 3 characters"]
    },
    relationship : {
        type : String,
        required : [true, "Relationship is required"],
        trim : true,
        max : [50 , "Relationship must be less than 50 characters"],
        min : [3, "Relationship must be more than 3 characters"]
    },
    language : [{
        type : String,
        required : [true, "Language is required"],
        trim : true,
        max : [50 , "Language must be less than 50 characters"],
        min : [3, "Language must be more than 3 characters"]
    }]

},{timestamps : true})

export const Parent = mongoose.model("parent", parentSchema);