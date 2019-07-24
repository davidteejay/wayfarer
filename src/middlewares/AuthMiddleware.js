/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import returnError from '../helpers/errorHandler';

dotenv.config();
const { JWT_SECRET } = process.env;

export default class AuthMiddleware {
  static async validateToken(req, res, next) {
    try {
      const { token } = req.body;

      if (token) {
        await jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err || !decoded) return returnError(res, 'Invalid Token', 401);

          const { user } = decoded;
          req.data = { ...req.data, user };
          return next();
        });
      } else return returnError(res, 'Token Not Found', 401);
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
