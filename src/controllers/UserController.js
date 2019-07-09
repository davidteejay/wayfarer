/* eslint-disable camelcase */
import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const Users = new Model('users');

export default class UserController {
  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const { token } = req.data;
      const login = await Users.select('*', `WHERE email = '${email}' AND password = '${password}'`);

      if (login.length > 0) {
        return res.status(200).json({
          data: { ...login[0], token },
          status: 'success',
        });
      }

      return returnError(res, 'Email or Password is incorrect', 404);
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }

  static async signUp(req, res) {
    try {
      const {
        first_name, last_name, email, password,
      } = req.body;
      const { token } = req.data;

      const data = await Users.insert('first_name, last_name, email, password', `'${first_name}', '${last_name}', '${email}', '${password}'`);

      return res.status(200).json({
        data: { ...data, token },
        status: 'success',
      });
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
