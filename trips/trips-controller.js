import * as tripsDao from "./trips-dao.js"

const TripController = (app) => {

    app.post('/api/trips', createTrip);
    app.get('/api/trips', findTrips);
    app.get('/api/trips/:tid', findTripById);


 
    
}

const createTrip = async (req, res) => {
    const newTrip = req.body;
    const insertedTrip = await tripsDao
    .createTrip(newTrip);
    res.json(insertedTrip);
  };



const findTrips = async (req, res) => {
    const trips = await tripsDao.findTrip()
    res.json(trips)
  }
  
  const findTripById = async (req, res) => {
    const trip = await tripsDao.findTripById(req.params.tid)
    res.json(trip)
  }
  

export default TripController;


