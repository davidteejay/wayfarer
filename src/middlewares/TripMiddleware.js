/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import Joi from 'joi';

import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const db = new Model();

export default class TripMiddleware {
  static async validateData(req, res, next) {
    try {
      const schema = Joi.object().keys({
        bus_id: Joi.number().positive().required(),
        origin: Joi.string().trim().min(3).required(),
        token: Joi.string().trim().min(3).required(),
        destination: Joi.string().trim().min(3).required(),
        trip_date: Joi.string().trim().min(3).required(),
        fare: Joi.number().positive().required(),
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

  static async checkIfBusExists(req, res, next) {
    try {
      const { bus_id } = req.body;

      const { rows } = await db.query('SELECT * FROM buses WHERE id = $1', [bus_id]);

      if (rows.length < 1) return returnError(res, 'Bus not found', 404);

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }

  static async checkIfTripExists(req, res, next) {
    try {
      const { trip_id } = req.params;

      const { rows } = await db.query('SELECT * FROM trips WHERE id = $1', [trip_id]);

      if (rows.length < 1) return returnError(res, 'Trip does not exist', 404);

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
