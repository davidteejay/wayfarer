/* eslint-disable camelcase */
import Model from '../models/Model';
import returnError from '../helpers/errorHandler';
import generateToken from '../helpers/generateToken';

const db = new Model();

export default class UserController {
  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const { rows } = await db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

      if (rows.length > 0) {
        const token = await generateToken(res, rows[0]);

        return res.status(200).json({
          data: { ...rows[0], token },
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

      const { rows } = await db.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, email, password]);
      const token = await generateToken(res, rows[0]);

      return res.status(200).json({
        data: { ...rows[0], token },
        status: 'success',
      });
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
