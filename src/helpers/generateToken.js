/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import returnError from './errorHandler';

dotenv.config();
const { JWT_SECRET } = process.env;

const generateToken = async (res, user_id) => {
  try {
    const token = await jwt.sign({ user_id }, JWT_SECRET, {
      expiresIn: 43200,
    });
    console.log(token)

    return token;
  } catch (err) {
    return returnError(res, err.message, 500);
  }
};

export default generateToken;
