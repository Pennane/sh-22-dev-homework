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
  // Duration between character deterioration - Values as minutes and between 1 and 60
  deteriorateFrequency: 10,
  // Duration between character aging - Values as minutes and between 1 and 60
  agingFrequency: 30,
};

const appConfig: AppConfig = {
  port: Number(process.env.PORT) || 3000,
  databasePath: process.env.DATABASE_PATH || './db',
  character: characterConfig,
};

export default appConfig;
