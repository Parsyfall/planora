import crypto from 'node:crypto';

const ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

export const hashPassword = async (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
  return `${salt}:${hash}`;
};

export const comparePassword = async (password, storedValue) => {
  if (!storedValue || !storedValue.includes(':')) {
    return false;
  }

  const [salt, originalHash] = storedValue.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');

  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(originalHash, 'hex'));
};
