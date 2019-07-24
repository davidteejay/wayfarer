/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import Joi from 'joi';

import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const db = new Model();

export default class BookingMiddleware {
  static async validateData(req, res, next) {
    try {
      const schema = Joi.object().keys({
        trip_id: Joi.number().positive().required(),
        seat_number: Joi.number().positive().optional(),
        token: Joi.string().trim().min(3).required(),
      });

      await schema.validate({ ...req.body }, { abortEarly: false })
        .then(() => next())
        .catch((error) => {
          const errors = error.details.map(d => d.message);
          return returnError(res, errors, 422);
        });
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

  static async checkIfUserHasBooking(req, res, next) {
    try {
      const { user_id } = req.data;
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
