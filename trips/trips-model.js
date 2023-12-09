import mongoose from 'mongoose';
import tripsSchema from './trips-schema.js'
const tripsModel = mongoose
            .model('TripsModel', tripsSchema);
export default tripsModel;