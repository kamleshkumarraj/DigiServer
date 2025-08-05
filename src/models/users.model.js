import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // optional: ensures case-insensitive email
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username must be at most 30 characters long"],
    },

    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 6 characters long"],
      select: false, // Exclude password from query results by default,
    },

    role: {
      type: String,
      enum: ["student", "faculty", "parent", "admin"],
      required: true,
      default: "student", // Default role is 'student'
    },

    rolesId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "role",
      required: true,
    },

    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        required: true,
        type: String,
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//method for creating new jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {});
};

// Method for comparing the password in hash form.
userSchema.methods.comparePassword = async function (password) {
  let status = await bcrypt.compare(password, this.password);
  return status;
};

//method for generating resetPassword token.

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  const hashResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordToken = hashResetToken;
  this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
