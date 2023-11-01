import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import HelloController from "./hello-controller.js";
import mongoose from "mongoose";
import UserController from './users/users-controller.js';
import IteneraryController from './itenerary/interpreter.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Connected...");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

const app = express();

// CORS Middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);



// Express JSON Middleware
app.use(express.json());

// Routes
HelloController(app);
UserController(app);
IteneraryController(app);

// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on port ${process.env.PORT || 4000}`);
});
