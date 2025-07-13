import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'

// only all routes are imported here.
import { universityRouter } from "./routes/university.routes.js";
import { collageRouter } from "./routes/collage.routes.js";
import { branchRouter } from "./routes/branch.routes.js";
import { semesterRouter } from "./routes/semester.routes.js";
import { classroomRouter } from "./routes/classroom.routes.js";
import { studentRouter } from "./routes/student.routes.js";
import { facultyRouters } from "./routes/faculty.routes.js";
import { syllabusRouter } from "./routes/syllabus.routes.js";
import { authRouter } from "./routes/auth.routes.js";

export const app = express();

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1); // Exit the process
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1); // Exit the process
});

// now we configure routes for auth.
app.use("/api/v1/auth", authRouter);

// now we create router for each routes.
app.use("/api/v1/university", universityRouter);
// console.log(hello)

// now we configure routes for collage.
app.use("/api/v1/collage", collageRouter);

// now we configure routes for branch.
app.use("/api/v1/branch", branchRouter);

// now we configure routes for semester.
app.use("/api/v1/semester", semesterRouter);

// now we configure routes for classroom.
app.use("/api/v1/classroom", classroomRouter);

// now we configure student auth routes.
app.use("/api/v1/student", studentRouter);

// now we configure faculty auth routes.
app.use("/api/v1/faculty", facultyRouters);

// now we configure syllabus routes.
app.use("/api/v1/syllabus", syllabusRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
