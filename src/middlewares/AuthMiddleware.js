/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import returnError from '../helpers/errorHandler';

dotenv.config();
const { JWT_SECRET } = process.env;

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
          if (err) {
            return returnError(res, 'Invalid Token', 401);
          }

          return next();
        });
      }

      return returnError(res, 'Token Not Found', 401);
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
