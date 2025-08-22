import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema(
  {
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
    classroomName: {
      type: String,
      required: true,
      trim: true,
    },
    classroomCode: {
      type: String,
      required: true,
      trim: true,
    },
    facultyId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    }],
    syllabus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Syllabus",
      required: true,
    },
  },
  { timestamps: true }
);

export const Classroom = mongoose.model("Classroom", classroomSchema);
