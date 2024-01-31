import { Pool } from 'pg';

require('dotenv').config();

const pool = new Pool({
    // user: 'postgres',
    // host: 'localhost',
    // database: 'MatchPro',
    // password: '3q-iXJNQ5RV#HE$',
    // port: 5432,
    connectionString: process.env.DATABASE_URL,
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
});

export default pool;
