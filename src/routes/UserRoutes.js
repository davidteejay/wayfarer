import UserController from '../controllers/UserController';

export default (router) => {
  router.get('/', UserController.getAllUsers);

  return router;
};
