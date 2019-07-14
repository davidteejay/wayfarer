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
}
