import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import HelloController from "./hello-controller.js";
import session from 'express-session';
import mongoose from "mongoose";

dotenv.config()
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
    || 'mongodb://127.0.0.1:27017/travelBestie'
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000"
        
    })
);

app.use(express.json());
HelloController(app);
app.listen(process.env.PORT || 4000);