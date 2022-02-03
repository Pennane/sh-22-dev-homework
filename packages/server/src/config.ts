import dotenv from 'dotenv';
import { AppConfig } from './types/global';

dotenv.config();

export const characterConfig = {
  age: {
    min: 1,
    max: 3,
  },
  happiness: {
    min: 0,
    max: 10,
  },
  hunger: {
    min: 0,
    max: 10,
  },
};

const appConfig: AppConfig = {
  port: Number(process.env.PORT) || 3000,
  databasePath: process.env.DATABASE_PATH || './db',
  character: characterConfig,
};

export default appConfig;
