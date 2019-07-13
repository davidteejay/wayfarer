import TripController from '../controllers/TripController';
import TripMiddleware from '../middlewares/TripMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';

export default (router) => {
  router.get('/', AuthMiddleware.validateToken, TripController.getTrips);
  router.post('/', AuthMiddleware.validateToken, AuthMiddleware.checkIfUserIsAdmin, TripMiddleware.validateData, TripMiddleware.checkIfBusExists, TripController.addTrip);
  router.post('/cancel', AuthMiddleware.validateToken, AuthMiddleware.checkIfUserIsAdmin, TripMiddleware.checkIfTripExists, TripController.cancelTrip);

  return router;
};
