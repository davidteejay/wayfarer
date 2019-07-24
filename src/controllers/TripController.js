/* eslint-disable camelcase */
import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const db = new Model();

export default class TripController {
  static async addTrip(req, res) {
    try {
      const {
        bus_id, origin, destination, trip_date, fare,
      } = req.body;
      const { user } = req.data;

      if (!user.is_admin) return returnError(res, 'You don\'t have access to perform this operation', 401);

      const { rows } = await db.query('INSERT INTO trips (bus_id, origin, destination, trip_date, fare) VALUES ($1, $2, $3, $4, $5) RETURNING *', [bus_id, origin, destination, trip_date, fare]);

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
      const { trip_id } = req.params;
      const { user } = req.data;

      if (!user.is_admin) return returnError(res, 'You don\'t have access to perform this operation', 401);

      const { rows } = await db.query("UPDATE trips SET status = 'cancelled' WHERE id = $1 RETURNING *", [trip_id]);

      return res.status(200).json({
        data: {
          message: 'Trip cancelled successfully',
          ...rows[0],
        },
        status: 'success',
      });
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }

  static async getTrips(req, res) {
    try {
      const { search } = req.query;
      let query = 'SELECT origin, destination, trip_date, fare, status, number_plate as bus_plate_number, manufacturer AS bus_manufacturer, model AS bus_model, capacity AS bus_capacity FROM trips JOIN buses ON trips.bus_id = buses.id';
      let values = [];

      if (search) {
        query = 'SELECT origin, destination, trip_date, fare, status, number_plate as bus_plate_number, manufacturer AS bus_manufacturer, model AS bus_model, capacity AS bus_capacity FROM trips JOIN buses ON trips.bus_id = buses.id WHERE origin LIKE $1 OR destination LIKE $1';
        values = [`%${search}`];
      }

      const { rows } = await db.query(query, values);
      return res.status(200).json({
        data: rows,
        status: 'success',
      });
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
