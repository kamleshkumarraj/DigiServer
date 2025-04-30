import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: { type: String },
  title: { type: String },
  submissionDate: { type: Date },
  submitted: { type: Boolean, default: false },
  remarks: { type: String },
});

export const Assignment = mongoose.model("Assignment", assignmentSchema);
