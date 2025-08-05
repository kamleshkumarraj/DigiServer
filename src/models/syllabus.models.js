import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema({
  syllabusName: {
    type: String,
    required: [true, "Syllabus name is required"],
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  semesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
  coreSubject: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  ],
  electiveSubject: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  ],
  labSubject: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  ],
}, {timestamps : true});

export const Syllabus = mongoose.model("Syllabus", syllabusSchema);
