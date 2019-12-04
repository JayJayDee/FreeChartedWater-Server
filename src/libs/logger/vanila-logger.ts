import { green, red, yellow } from 'chalk';
import moment from 'moment';

import { Logger } from './types';

const vanilaLogger = (): Logger => ({
  info(...args) {
    console.info(...[green(`${now()} info`), ...args]);
  },
  error(...args) {
    console.error(...[red(`${now()} error`), ...args]);
  },
  debug(...args) {
    console.debug(...[yellow(`${now()} debug`), ...args]);
  },
});

const now = () => moment().format('YYYY-MM-DD HH:mm:ss');

export default vanilaLogger;
