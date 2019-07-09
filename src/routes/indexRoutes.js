import UserRoutes from './UserRoutes';
import TripRoutes from './TripRoutes';

export default (router) => {
  router.use('/auth', UserRoutes(router));
  router.use('/trips', TripRoutes(router));

  return router;
};
