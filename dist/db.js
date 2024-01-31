"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'MatchPro',
    password: '3q-iXJNQ5RV#HE$',
    port: 5432,
});
exports.default = pool;
