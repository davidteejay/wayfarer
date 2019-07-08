import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';

export default (router) => {
  router.get('/', UserController.getAllUsers);
  router.post('/login', UserController.signIn);
  router.post('/signup', UserMiddleware.validateUserData, UserMiddleware.checkIfEmailExists, UserController.signUp);

  return router;
};
