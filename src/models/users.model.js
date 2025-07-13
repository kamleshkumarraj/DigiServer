import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // optional: ensures case-insensitive email
    match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        'Invalid email format'
        ]
    },
    username : {
        type : String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username must be at most 30 characters long']
    },

    password : {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 6 characters long'],
        select: false, // Exclude password from query results by default,
        match : [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ]
    },

    roles : {
        type : String,
        enum : ['student', 'faculty', 'parent', 'admin'],
        required : true,
        default : 'student' // Default role is 'student'
    },

    rolesId : {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'roles',
        required: true
    }
}, {timestamps : true});