import UserRoutes from './UserRoutes';

export default (router) => {
  router.use('/users', UserRoutes(router));

  return router;
};
