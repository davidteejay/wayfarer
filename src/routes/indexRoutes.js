import express from 'express';

import UserRoutes from './UserRoutes';
import TripRoutes from './TripRoutes';
import BookingRoutes from './BookingRoutes';

const router = express.Router();

router.use('/auth', UserRoutes);
router.use('/trips', TripRoutes);
router.use('/bookings', BookingRoutes);

export default router;
