/* eslint-disable camelcase */
import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const Buses = new Model('buses');
const Trips = new Model('trips');

export default class TripMiddleware {
  static async validateData(req, res, next) {
    try {
      const {
        user_id, bus_id, origin, destination, trip_date, fare,
      } = req.body;

      if (
        !user_id || user_id === ''
        || !bus_id || bus_id === ''
        || !origin || origin === ''
        || !destination || destination === ''
        || !trip_date || trip_date === ''
        || !fare || fare === ''
      ) {
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

      const data = await Buses.select('*', `WHERE id = '${bus_id}'`);

      if (data.length < 1) return returnError(res, 'Bus not found', 404);

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }

  static async checkIfTripExists(req, res, next) {
    try {
      const { trip_id } = req.body;

      const data = await Trips.select('*', `WHERE id = '${trip_id}'`);

      if (data.length < 1) return returnError(res, 'Trip does not exist', 404);

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
