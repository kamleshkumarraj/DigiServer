import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    address : {
        type : String,
        required : [true, "Address is required"],
        trim : true,
        max : [100, "Address must be less than 100 characters"],
        min : [3, "Address must be more than 3 characters"]
    },
    state : {
        type : String,
        required : [true, "State is required"],
        trim : true,
        max : [50, "State must be less than 50 characters"],
        min : [2, "State must be more than 2 characters"]
    },
    country : {
        type : String,
        required : [true, "Country is required"],
        trim : true,
        max : [50, "Country must be less than 50 characters"],
        min : [2, "Country must be more than 2 characters"]
    },
    zipCode : {
        type : String,
        required : [true, "Zip code is required"],
        trim : true,
        max : [10, "Zip code must be less than 10 characters"],
        min : [3, "Zip code must be more than 3 characters"]
    },
    parentPhoneNumber : {
        type : String,
        required : [true, "Parent phone number is required"],
        trim : true,
        max : [15, "Parent phone number must be less than 15 characters"],
        min : [10, "Parent phone number must be more than 10 characters"]
    },
    emergencyContact : {
        type : String,
        required : [true, "Emergency contact is required"],
        trim : true,
        max : [15, "Emergency contact must be less than 15 characters"],
        min : [10, "Emergency contact must be more than 10 characters"]
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
})

export const ContactInfo = mongoose.model("ContactInfo", contactSchema);