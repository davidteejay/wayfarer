/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import Joi from 'joi';

import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const db = new Model();

export default class UserMiddleware {
  static async validateData(req, res, next) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().trim().email().min(3)
          .required(),
        first_name: Joi.string().trim().min(3).required(),
        last_name: Joi.string().trim().min(3).required(),
        password: Joi.string().trim().min(6).required(),
      });

      await schema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch((error) => {
          const errors = error.details.map(d => d.message);
          return returnError(res, errors, 422);
        });
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
