import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';

export default (router) => {
  router.post('/login', AuthMiddleware.generateToken, UserController.signIn);
  router.post('/signup', UserMiddleware.validateUserData, UserMiddleware.checkIfEmailExists, AuthMiddleware.generateToken, UserController.signUp);

  return router;
};
