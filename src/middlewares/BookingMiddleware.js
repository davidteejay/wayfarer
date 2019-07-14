/* eslint-disable camelcase */
import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const db = new Model();

export default class BookingMiddleware {
  static async validateData(req, res, next) {
    try {
      const { user_id, trip_id } = req.body;

      if (!user_id || !trip_id) {
        return returnError(res, 'Incomplete booking data', 401);
      }

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }

  static async checkIfSeatIsTaken(req, res, next) {
    try {
      const { seat_number, trip_id } = req.body;

      if (seat_number) {
        const { rows } = await db.query('SELECT * FROM bookings WHERE seat_number = $1 AND trip_id = $2', [seat_number, trip_id]);

        if (rows.length > 0) {
          return returnError(res, 'This seat is already taken', 401);
        }

        return next();
      }

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }

  static async checkIfUserHasBooked(req, res, next) {
    try {
      const { trip_id, user_id } = req.body;

      const { rows } = await db.query('SELECT * FROM bookings WHERE trip_id = $1 AND user_id = $2', [trip_id, user_id]);

      if (rows.length > 0) {
        return returnError(res, 'You have already booked this trip', 401);
      }

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}