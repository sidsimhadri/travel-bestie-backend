import tripsModel from "./trips-model.js";

export const createTrip = (trip) => tripsModel.create(trip);

export const findTrip = () => tripsModel.find();

export const findTripById = (tid) => tripsModel.findById(tid);