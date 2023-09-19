import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import routes from "./routes/ProductRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import { Error } from "./middleware/error.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import cookieParser from "cookie-parser"
import cloudinary from "cloudinary"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import Razorpay from "razorpay"

import socialUserRoutes from "./routes/socialLoginRoutes.js"

import session from "express-session"
import passportSetup from './passport.js'
import passport from 'passport';
import categoryRoutes from "./routes/categoriesRoutes.js"
import queryRoutes from "./routes/queryRoutes.js"
import scholarshipRoutes from "./routes/scholarshipRoutes.js"


dotenv.config()



// unhandled Uncaught Exception   upper hi likhna shi nhi iske upper likha glat to wha se error aa jyega 
// like console.log(hekfhs) 

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log("Shutting down there server due to unhandled uncaught exception ")
})

const app = express()
const DB_MONGOOSE = process.env.DB_MONGOOSE
const PORT = process.env.PORT

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(express.json({
    limit: '50mb'
}))

app.use(
    session({
        secret: "your-secret-key",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());



app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use("/api/v1", routes)
app.use("/api/v1", userRoutes)
app.use("/api/v1", paymentRoutes)
app.use("/auth", socialUserRoutes);
app.use("/api/v1", categoryRoutes)
app.use("/api/v1", orderRoutes)
app.use("/api/v1", queryRoutes)
app.use("/api/v1", scholarshipRoutes)
app.use(Error)


mongoose.connect(DB_MONGOOSE)
    .then(
        console.log("Database is connected")
    )
//catch hta diya kyu ki ab humne unhandled error kar liya

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const server = app.listen(PORT, () => {
    console.log(`The server is connected on PORT: ${PORT}`)
})

// unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`)
    console.log("Shutting down there server due to unhandled Promise ")

    server.close(() => {
        process.exit(1)
    })

})

