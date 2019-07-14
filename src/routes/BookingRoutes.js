import express from 'express';

import AuthMiddleware from '../middlewares/AuthMiddleware';
import BookingMiddleware from '../middlewares/BookingMiddleware';
import BookingController from '../controllers/BookingController';

const router = express.Router();

router.post('/', AuthMiddleware.validateToken, BookingMiddleware.validateData, BookingMiddleware.checkIfUserHasBooked, BookingMiddleware.checkIfSeatIsTaken, BookingController.addBooking);

export default router;
