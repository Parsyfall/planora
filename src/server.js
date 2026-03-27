import app from './app.js';
import { env } from './config/env.js';
import pool from './config/db.js';

const start = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();

    app.listen(env.port, () => {
      console.log(` backend listening on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

start();
