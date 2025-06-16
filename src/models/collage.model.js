import mongoose, { Schema } from "mongoose";

const collageSchema = new Schema({
    collageName : {
        type : String,
        required : true,
    },
    registrationId : {
        type : String,
        required : true,
        unique : true
    },
    country : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    postalCode : {
        type : Number,
        required : true
    },
    universityId : {
        type : Schema.Types.ObjectId,
        ref : "University",
        required : true
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
},{timestamps : true});

export const Collage = mongoose.model("Collage", collageSchema);