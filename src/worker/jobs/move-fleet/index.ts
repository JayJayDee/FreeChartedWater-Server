import { log } from '../../../libs/logger';

const tag = '[job:move-fleet]';

export const moveFleetJob =
  async () => {
    log.debug(`${tag} job started.`);
    log.debug(`${tag} job ended.`);
  };
