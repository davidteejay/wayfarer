/* eslint-disable camelcase */
import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const db = new Model();

export default class UserMiddleware {
  static async validateUserData(req, res, next) {
    try {
      const {
        first_name, last_name, email, password,
      } = req.body;

      if (!first_name || !last_name || !password || !email) {
        return returnError(res, 'Incomplete user data', 401);
      }

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }

  static async checkIfEmailExists(req, res, next) {
    try {
      const { email } = req.body;
      const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

      if (rows.length > 0) {
        return returnError(res, 'Email already exists', 401);
      }

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
