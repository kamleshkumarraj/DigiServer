import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: { type: String, required: true },
  examType: {
    type: String,
    enum: ["Unit Test", "Midterm", "Final"],
    required: true,
  },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  examDate: { type: Date },
});

export const Marks = mongoose.model("Marks", marksSchema);
