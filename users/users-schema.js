import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const usersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: { 
        type: String, 
        required: true 
    },
    name: String,
    lastName: String,
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
    }]
}, {
    collection: "users"
});

export default usersSchema;
