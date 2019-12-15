import { log } from '../libs/logger';
import { loadConfig } from '../libs/configs';
import { initTypeORM } from '../libs/typeorm-initiator';

import { initSocketIO } from './socketio-initiator';

const tag = '[websocket-server]';

(async () => {
  log.info(`${tag} server starting..`);

  await initTypeORM();

  const io = initSocketIO();
  const port = loadConfig('WEBSOCKET_PORT');

  io.on('connection', (socket) => {
    console.log('!');
  });

  io.listen(port);
  log.info(`${tag} websocket server started, port: ${port}`);
})();
