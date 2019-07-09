/* eslint-disable camelcase */
import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const db = new Model();

export default class TripController {
  static async addTrip(req, res) {
    try {
      const {
        user_id, bus_id, origin, destination, trip_date, fare,
      } = req.body;

      const { rows } = await db.query('INSERT INTO trips (bus_id, origin, destination, trip_date, fare, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [bus_id, origin, destination, trip_date, fare, user_id]);

      return res.status(200).json({
        data: { ...rows[0] },
        status: 'success',
      });
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }

  static async cancelTrip(req, res) {
    try {
      const { trip_id } = req.body;

      const { rows } = await db.query("UPDATE trips SET status = 'cancelled' WHERE id = $1 RETURNING *", [trip_id]);

      return res.status(200).json({
        data: { ...rows[0] },
        status: 'success',
      });
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
