import { log } from '../libs/logger';
import { loadConfig } from '../libs/configs';

const tag = '[websocket-server]';

(async () => {
  log.info(`${tag} server starting..`);

  const port = loadConfig('WEBSOCKET_PORT');

  log.info(`${tag} websocket server started, port: ${port}`);
})();
