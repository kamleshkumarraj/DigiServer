import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique : true
    },
    registrationId: {
        type : String,
        required : true,
        unique : true
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state :{
        type : String,
        required : true
    },
    address: {
        type: String,
        required: true,
    },
    postalCode : {
        type : Number,
        required : true
    },
    description: {
        type: String,
        required: true,
    },
    image : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    }
},{timestamps : true})

export const University = mongoose.model("University", universitySchema);