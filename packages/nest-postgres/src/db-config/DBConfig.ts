import { Client } from 'pg';

export const PgClient = new Client({
  user: 'nish',
  host: 'localhost',
  database: 'firstdb',
  password: 'Nish1234',
  port: 5432,
});