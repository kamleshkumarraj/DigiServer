import express from 'express';
import cors from 'cors';

export const app = express();

app.use(express.json({
    limit : "10mb"
}))

app.use(express.urlencoded({
    extended : true
}))

app.use(cors({
    origin : ["http://localhost:5173","http://localhost:5174"],
    methods : ["GET","POST","PATCH","DELETE","PUT"],
    credentials : true
}))

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

// console.log(hello)


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success : false,
        status,
        message
    })
})