/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import returnError from './errorHandler';

dotenv.config();
const { JWT_SECRET } = process.env;

const generateToken = async (res, user) => {
  try {
    const token = await jwt.sign({ user }, JWT_SECRET, {
      expiresIn: 43200,
    });

    return token;
  } catch (err) {
    return returnError(res, err.message, 500);
  }
};

export default generateToken;
