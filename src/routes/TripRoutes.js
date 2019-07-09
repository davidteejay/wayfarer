import TripController from '../controllers/TripController';
import TripMiddleware from '../middlewares/TripMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';

export default (router) => {
  router.post('/', AuthMiddleware.validateToken, AuthMiddleware.checkIfUserIsAdmin, TripMiddleware.validateData, TripMiddleware.checkIfBusExists, TripController.addTrip);

  return router;
};
