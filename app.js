import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import HelloController from "./hello-controller.js";
import mongoose from "mongoose";
import admin from "firebase-admin";
import UserController from './users/users-controller.js';

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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

// Firebase Authentication Middleware
const authCheckMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send("Unauthorized");
    return;
  }

  const token = authHeader.split('Bearer ')[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch(() => {
      res.status(403).send("Access denied");
    });
};

app.use('/protected-route', authCheckMiddleware);

// Express JSON Middleware
app.use(express.json());

// Routes
HelloController(app);
UserController(app);

// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on port ${process.env.PORT || 4000}`);
});
