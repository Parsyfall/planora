import dotenv from 'dotenv';

dotenv.config();

const required = ['JWT_SECRET', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_NAME'];

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`[env] Missing environment variable: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT || 3001),
  nodeEnv: process.env.NODE_ENV || 'development',
  appOrigin: process.env.APP_ORIGIN || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'change_this_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: Number(process.env.DB_PORT || 3306),
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_NAME || 'planora_db',
  dbConnectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpSecure: String(process.env.SMTP_SECURE || 'false') === 'true',
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
  smtpFrom: process.env.SMTP_FROM || 'Planora <no-reply@planora.local>'
};
