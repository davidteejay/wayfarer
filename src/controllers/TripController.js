/* eslint-disable camelcase */
import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const Trips = new Model('trips');

export default class TripController {
  static async addTrip(req, res) {
    try {
      const {
        user_id, bus_id, origin, destination, trip_date, fare,
      } = req.body;

      const data = await Trips.insert('bus_id, origin, destination, trip_date, fare, created_by', `'${bus_id}', '${origin}', '${destination}', '${trip_date}', '${fare}', '${user_id}'`);

      return res.status(200).json({
        data,
        status: 'success',
      });
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
