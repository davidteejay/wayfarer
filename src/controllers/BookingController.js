/* eslint-disable camelcase */
import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const db = new Model();

export default class BookingController {
  static async addBooking(req, res) {
    try {
      const {
        trip_id, seat_number,
      } = req.body;
      const { user_id } = req.data;

      const { rows } = await db.query('INSERT INTO bookings (trip_id, seat_number, user_id) VALUES ($1, $2, $3) RETURNING *', [trip_id, seat_number, user_id]);

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
      const { is_admin, user_id } = req.data;
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

  static async deleteBooking(req, res) {
    try {
      const { booking_id } = req.params;

      const { rows } = await db.query('DELETE FROM bookings WHERE id = $1', [booking_id]);

      return res.status(200).json({
        data: {
          message: 'Booking deleted successfully',
          ...rows[0],
        },
        status: 'success',
      });
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
