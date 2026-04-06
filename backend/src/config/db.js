import mysql from 'mysql2/promise';
import { env } from './env.js';

const pool = mysql.createPool({
  host: env.dbHost,
  port: env.dbPort,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
  connectionLimit: env.dbConnectionLimit,
  namedPlaceholders: true
});

export const query = async (sql, params = {}) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};

export const getConnection = () => pool.getConnection();

export default pool;
