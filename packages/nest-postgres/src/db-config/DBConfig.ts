import { Client } from 'pg';

const config = process.env;

export const PgClient = new Client({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_DATABASE,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
});