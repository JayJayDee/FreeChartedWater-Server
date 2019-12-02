import configLoader from './config-loader';

const loadConfig = configLoader(process.env);

export {
  loadConfig,
};
