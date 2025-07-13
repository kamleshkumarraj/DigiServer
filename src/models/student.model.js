import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

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
    avatar : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            required : true,
            type : String
        }
    }
},{timestamps : true})

studentSchema.pre('save' , async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password , 10)
})

//method for creating new jwt token
studentSchema.methods.getJWTToken = function(){
    return jwt.sign({id : this._id},process.env.JWT_SECRET , {
        
    })
}

// Method for comparing the password in hash form.
studentSchema.methods.comparePassword = async function(password){
    let status =  await bcrypt.compare(password , this.password)
    return status;
}

//method for generating resetPassword token.

studentSchema.methods.generateResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")

    const hashResetToken = crypto.createHash('sha256').update(resetToken).digest("hex")

    this.resetPasswordToken = hashResetToken;
    this.resetPasswordExpiry = Date.now() + 15*60*1000;

    return resetToken;
}


export const Student = mongoose.model("Student", studentSchema);