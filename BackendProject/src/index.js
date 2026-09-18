// require('dotenv').config({path:'./env'})
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
import mongoose from "mongoose"
import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js"
import dotenv from "dotenv"

dotenv.config({
    paath:'./env'
})

connectDB();


/*
import express from "express"
const app = express()

;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${BACKEND}`)
        app.on("error",(error) => {
            console.log("ERROR",error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR",error)
        throw error
    }
})()
    */