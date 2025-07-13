import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  subject: { type: String },
  title: { type: String },
  submissionDate: { type: Date },
  submitted: { type: Boolean, default: false },
  remarks: { type: String },
  question: [
    {
      type: String,
      required: [true, "Question is required"],
    },
  ],
});

export const Assignment = mongoose.model("Assignment", assignmentSchema);
