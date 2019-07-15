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

  static async checkIfUserIsAdmin(req, res, next) {
    try {
      const { user_id } = req.body;

      if (!user_id) {
        return returnError(res, 'User ID not specified', 404);
      }

      const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [user_id]);

      req.data = {
        is_admin: rows[0].is_admin,
      };

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }

  static async checkIfUserHasBooking(req, res, next) {
    try {
      const { user_id } = req.body;
      const { booking_id } = req.params;

      const { rows } = await db.query('SELECT * FROM bookings WHERE user_id = $1 AND id = $2', [user_id, booking_id]);

      if (rows.length < 1) {
        return returnError(res, 'Booking not found', 404);
      }

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
