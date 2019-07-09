/* eslint-disable camelcase */
import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const Users = new Model('"wayfarer"."users"');

export default class UserMiddleware {
  static async validateUserData(req, res, next) {
    try {
      const {
        first_name, last_name, email, password,
      } = req.body;

      if (
        !first_name || first_name === ''
        || !last_name || last_name === ''
        || !password || password === ''
        || !email || email === ''
      ) {
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
      const data = await Users.select('*', `WHERE email = '${email}'`);

      if (data.length > 0) {
        return returnError(res, 'Email already exists', 401);
      }

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
