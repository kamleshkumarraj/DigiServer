import mongoose from "mongoose";

const behaviorSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: { type: Date, default: Date.now },
  teacherName: { type: String },
  remarks: { type: String },
  type: {
    type: String,
    enum: ["Positive", "Negative", "Neutral"],
    default: "Neutral",
  },
});
export const Behavior = mongoose.model("Behavior", behaviorSchema);
