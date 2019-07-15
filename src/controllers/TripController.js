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
      const { trip_id } = req.params;

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
      const { origin, destination } = req.query;
      let query = 'SELECT origin, destination, trip_date, fare, status, number_plate as bus_plate_number, manufacturer AS bus_manufacturer, model AS bus_model, capacity AS bus_capacity FROM trips JOIN buses ON trips.bus_id = buses.id';
      let values = [];

      if (origin) {
        query = 'SELECT origin, destination, trip_date, fare, status, number_plate as bus_plate_number, manufacturer AS bus_manufacturer, model AS bus_model, capacity AS bus_capacity FROM trips JOIN buses ON trips.bus_id = buses.id WHERE origin LIKE $1';
        values = [`%${origin}`];
      } else if (destination) {
        query = 'SELECT origin, destination, trip_date, fare, status, number_plate as bus_plate_number, manufacturer AS bus_manufacturer, model AS bus_model, capacity AS bus_capacity FROM trips JOIN buses ON trips.bus_id = buses.id WHERE destination LIKE $1';
        values = [`%${destination}`];
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
