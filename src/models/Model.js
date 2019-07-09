import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export default class Model {
  constructor(table) {
    this.table = table;
    // this.pool = new Pool({
    //   connectionString: process.env.PG_CONNECTION_STRING,
    // });
  }

  async select(columns = '*', clause = '') {
    const query = `SELECT ${columns} FROM ${this.table} ${clause}`;

    const pool = new Pool({
      connectionString: process.env.PG_CONNECTION_STRING,
    });
    const data = await pool.query(query);
    pool.end();
    return data.rows;
  }

  async insert(columns, values) {
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${values}) RETURNING *`;

    const pool = new Pool({
      connectionString: process.env.PG_CONNECTION_STRING,
    });
    const data = await pool.query(query);
    pool.end();
    return data.rows[0];
  }

  async update(columns, clause) {
    const query = `UPDATE ${this.table} SET ${columns} WHERE ${clause}`;

    const pool = new Pool({
      connectionString: process.env.PG_CONNECTION_STRING,
    });
    const data = await pool.query(query);
    pool.end();
    return data.rows;
  }

  // async delete(clause) {
  //   const query = `DELETE FROM ${this.table} WHERE ${clause}`;

  //   const pool = new Pool({
  //     connectionString: process.env.PG_CONNECTION_STRING,
  //   });
  //   const data = await pool.query(query);
  //   pool.end();
  //   return data.rows;
  // }
}
