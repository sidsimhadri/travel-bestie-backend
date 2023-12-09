import mongoose from "mongoose";

const { Schema, Types } = mongoose;



const tripsSchema = new Schema({
    _id: String,  // This will be the trip's Firebase UID
    tripLocation: {
        type: String,
    },
    tripInterests: [{
        type: String,
    }],
    tripStartDate: {
        type: Date,
    },
    tripEndDate: {
        type: Date,
    },
    tripRooms: {
        type: Number,
    },
    tripTravelers: [{
        type: Number,
    }],
    tripBudget: {
        type: Number,
    }
}, {
    collection: "trips"
});

export default tripsSchema;
