import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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
    username : {
        type : String,
        unique : true,
        max : [50 , "Username must be less than 50 characters"],
        min : [3, "Username must be more than 3 characters"],
        trim : true
    },
    email : {
        type : String,
        unique : true,
        max : [50 , "Email must be less than 50 characters"],
        min : [3, "Email must be more than 3 characters"],
        trim : true
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        max : [50 , "Password must be less than 50 characters"],
        min : [3, "Password must be more than 3 characters"],
        trim : true
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
    avatar : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            required : true,
            type : String
        }
    },
    university : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "University"
    },
    isActive : {
        type : Boolean,
        default : true
    },

}, {timestamps : true});


facultySchema.pre('save' , async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password , 10)
})

//method for creating new jwt token
facultySchema.methods.getJWTToken = function(){
    return jwt.sign({id : this._id},process.env.JWT_SECRET , {
        
    })
}

// Method for comparing the password in hash form.
facultySchema.methods.comparePassword = async function(password){
    console.log(password, this.password);
    let status =  await bcrypt.compare(password , this.password)
    console.log(status);
    return status;
}

//method for generating resetPassword token.

facultySchema.methods.generateResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")

    const hashResetToken = crypto.createHash('sha256').update(resetToken).digest("hex")

    this.resetPasswordToken = hashResetToken;
    this.resetPasswordExpiry = Date.now() + 15*60*1000;

    return resetToken;
}

export const Faculty = mongoose.model("Faculty", facultySchema);