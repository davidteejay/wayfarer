/* eslint-disable no-unused-vars */
import { Pool } from 'pg';
import dotenv from 'dotenv';
import debug from 'debug';

dotenv.config();

export default class Model {
  constructor() {
    this.pool = new Pool();

    this.pool.on('connect', () => {
      debug('wayfarer:pool')('DB Connection Successful');
    });
  }

  async query(query, values = []) {
    return new Promise((resolve, reject) => {
      this.pool.query(query, values)
        .then((res) => {
          resolve(res);
        });
    });
  }
}
