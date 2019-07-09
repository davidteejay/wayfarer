/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import returnError from '../helpers/errorHandler';
import Model from '../models/Model';

dotenv.config();
const { JWT_SECRET } = process.env;
const db = new Model();

export default class AuthMiddleware {
  static async generateToken(req, res, next) {
    try {
      const token = await jwt.sign({ check: true }, JWT_SECRET, {
        expiresIn: 43200,
      });

      req.data = { ...req.data, token };

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }

  static async validateToken(req, res, next) {
    try {
      const token = req.headers['access-token'];

      if (token) {
        await jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err || !decoded || !decoded.check) return returnError(res, 'Invalid Token', 401);

          return next();
        });
      } else return returnError(res, 'Token Not Found', 401);
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }

  static async checkIfUserIsAdmin(req, res, next) {
    try {
      const { user_id } = req.body;

      const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [user_id]);

      if (rows.length < 1 || !rows[0].is_admin) {
        return returnError(res, 'Access Denied', 401);
      }

      return next();
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
