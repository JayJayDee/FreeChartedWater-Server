import { log } from '../../../libs/logger';

const tag = '[job:change-day]';

export const changeDayJob =
  async () => {
    log.debug(`${tag} job started.`);
    log.debug(`${tag} job ended.`);
  };
