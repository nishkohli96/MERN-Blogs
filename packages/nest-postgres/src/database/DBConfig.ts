import { Client } from 'pg';

const config = process.env;

export const PgClient = new Client({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_DATABASE,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
});

/**  
 * Can config client like in https://node-postgres.com/guides/async-express
 * 
 * For large datasets, check out https://node-postgres.com/api/cursor
 */
