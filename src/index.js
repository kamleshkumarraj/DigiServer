import dotenv from 'dotenv';
dotenv.config({
    path : 'src/.env'
})

import { app } from "./app.js";
import { connectDB } from "./db/connectDatabase.js";

app.get('/',(req, res) => {
    res.status(200).json({
        success : true,
        message  : "Everything is okk."
    })
})

connectDB()
.then(() => {
    app.listen(process.env.PORT , () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log(`We can't start server because database connection failed due to this error : ${err}`)
})
