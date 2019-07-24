import express from 'express';

import TripController from '../controllers/TripController';
import TripMiddleware from '../middlewares/TripMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = express.Router();

router.get('/', AuthMiddleware.validateToken, TripController.getTrips);
router.post('/', AuthMiddleware.validateToken, TripMiddleware.validateData, TripMiddleware.checkIfBusExists, TripController.addTrip);
router.patch('/:trip_id', AuthMiddleware.validateToken, TripMiddleware.checkIfTripExists, TripController.cancelTrip);

export default router;
