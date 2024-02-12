import { Pool } from 'pg';

require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
  
  // connectionString: process.env.DATABASE_URL,
  // user: process.env.ELEPHANT_USER,
  // host: process.env.ELEPHANT_HOST,
  // database: process.env.ELEPHANT_DATABASE,
  // password: process.env.ELEPHANT_PASSWORD,
  // port: Number(process.env.ELEPHANT_PORT),
});

export default pool;
