import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const quizAnswerSchema = new Schema({
    questionNumber: String,
    answer: String
});

const usersSchema = new Schema({
    _id: String,  // This will be the user's Firebase UID
    username: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true, // sparse ensures uniqueness only for documents where the email field exists
        index: true
    },
    sentRequests: [{
        type: Types.ObjectId,
        ref: 'users'  // Reference to the same 'users' collection
    }],
    receivedRequests: [{
        type: Types.ObjectId,
        ref: 'users' 
    }],
    friends: [{
        type: Types.ObjectId,
        ref: 'users'
    }],
    interests: [{
        type: String,
    }],
    quizAnswers: [quizAnswerSchema]  // This will store the user's answers to the quiz
}, {
    collection: "users"
});

export default usersSchema;
