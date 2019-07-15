/* eslint-disable camelcase */
import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const db = new Model();

export default class BookingController {
  static async addBooking(req, res) {
    try {
      const {
        user_id, trip_id, seat_number,
      } = req.body;

      const { rows } = await db.query('INSERT INTO bookings (user_id, trip_id, seat_number) VALUES ($1, $2, $3) RETURNING *', [user_id, trip_id, seat_number]);

      return res.status(200).json({
        data: { ...rows[0] },
        status: 'success',
      });
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }

  static async getBookings(req, res) {
    try {
      const { user_id } = req.body;
      const { is_admin } = req.data;
      let query = '';
      let values = [];

      if (is_admin) query = 'SELECT * FROM bookings JOIN trips ON trips.id = bookings.trip_id JOIN users ON bookings.user_id = users.id';
      else {
        values = [user_id];
        query = 'SELECT * FROM bookings JOIN trips ON trips.id = bookings.trip_id JOIN users ON bookings.user_id = users.id WHERE user_id = $1';
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
