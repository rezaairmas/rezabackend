import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'default_secret_key',
  signOptions: {
    expiresIn: '60m',
  },
};
