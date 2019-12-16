import { createServer } from 'http';

import { log } from '../libs/logger';
import { loadConfig } from '../libs/configs';
import { initTypeORM } from '../libs/typeorm-initiator';

import { initSocketIO } from './socketio-initiator';
import { initEventRouter } from './event-router';
import { allEvents } from './events';

const tag = '[websocket-server]';

(async () => {
  log.info(`${tag} server starting..`);

  await initTypeORM();

  const port = loadConfig('WEBSOCKET_PORT');

  const server = createServer();
  const io = initSocketIO();

  const roomHandlers = allEvents();

  io.on('connection',
    (socket) =>
      initEventRouter({ socket, roomHandlers }));

  io.attach(server);

  server.listen(port, () => {
    log.info(`${tag} websocket server started, port: ${port}`);
  });
})();
