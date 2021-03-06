import express from 'express';

import AuthMiddleware from '../middlewares/AuthMiddleware';
import BookingMiddleware from '../middlewares/BookingMiddleware';
import BookingController from '../controllers/BookingController';

const router = express.Router();

router.get('/', AuthMiddleware.validateToken, BookingController.getBookings);
router.post('/', AuthMiddleware.validateToken, BookingMiddleware.validateData, BookingMiddleware.checkIfSeatIsTaken, BookingController.addBooking);
router.delete('/:booking_id', AuthMiddleware.validateToken, BookingMiddleware.checkIfUserHasBooking, BookingController.deleteBooking);

export default router;
