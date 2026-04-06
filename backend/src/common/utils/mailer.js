import nodemailer from 'nodemailer';
import { env } from '../../config/env.js';

let transporter = null;

const canSend = Boolean(env.smtpHost && env.smtpUser && env.smtpPass);

if (canSend) {
  transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass
    }
  });
}

export const sendMail = async ({ to, subject, html, text }) => {
  if (!transporter) {
    console.info('[mail] SMTP not configured. Skipping email send.', { to, subject });
    return { skipped: true };
  }

  await transporter.sendMail({
    from: env.smtpFrom,
    to,
    subject,
    html,
    text
  });

  return { skipped: false };
};
