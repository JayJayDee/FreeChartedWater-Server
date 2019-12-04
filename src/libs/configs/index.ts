import configLoader from './config-loader';
import dotenv from 'dotenv';

dotenv.config();

const loadConfig = configLoader(process.env);

export {
  loadConfig,
};
