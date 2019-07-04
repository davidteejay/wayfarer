import { Pool } from 'pg';
import debug from 'debug';
import dotenv from 'dotenv';

dotenv.config();

export default class Model {
  constructor(table) {
    this.table = table;
    this.pool = new Pool();

    Model.logger(`Our table is ${this.table}`);

    this.pool.on('connect', () => {
      Model.logger('DB Connected');
    });

    this.pool.on('error', (err) => {
      Model.logger(`An error occurred: ${err}`);
      process.exit(-1);
    });
  }

  static logger(message) {
    return debug('wayfarer:pool')(message);
  }

  static logQuery(query) {
    return Model.logger(`Query: ${query}`);
  }

  async select(columns = '*', clause = '') {
    const query = `SELECT ${columns} FROM ${this.table} ${clause}`;
    Model.logQuery(query);

    const data = await this.pool.query(query);
    return data.rows;
  }

  async insert(columns, values) {
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${values})`;
    Model.logQuery(query);

    const data = await this.pool.query(query);
    return data.rows;
  }

  async update(columns, clause) {
    const query = `UPDATE ${this.table} SET ${columns} WHERE ${clause}`;
    Model.logQuery(query);

    const data = await this.pool.query(query);
    return data.rows;
  }

  async delete(clause) {
    const query = `DELETE FROM ${this.table} WHERE ${clause}`;
    Model.logQuery(query);

    const data = await this.pool.query(query);
    return data.rows;
  }
}
