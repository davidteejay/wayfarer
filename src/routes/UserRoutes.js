import UserController from '../controllers/UserController';

export default (router) => {
  router.get('/', UserController.getAllUsers);
  router.post('/login', UserController.signIn);

  return router;
};
