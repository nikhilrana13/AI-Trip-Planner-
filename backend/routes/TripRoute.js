import express from "express";
import { CreateTrip, GetSavedTrips ,GetTripdetails} from "../controllers/TripController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();


router.post('/createtrip/:id',isAuth,CreateTrip);
router.get('/getsavedtrip/:id',isAuth,GetSavedTrips);
router.get('/gettrip/:id',isAuth,GetTripdetails);

export default router