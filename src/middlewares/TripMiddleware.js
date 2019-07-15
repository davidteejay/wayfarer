/* eslint-disable camelcase */
import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const db = new Model();

export default class TripMiddleware {
  static async validateData(req, res, next) {
    try {
      console.log(req.body)
      const {
        user_id, bus_id, origin, destination, trip_date, fare,
      } = req.body;

      if (!user_id || !bus_id || !origin || !destination || !trip_date || !fare) {
        return returnError(res, 'Incomplete trip data', 401);
      }

      return next();
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
