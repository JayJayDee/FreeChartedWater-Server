import SocketIO from 'socket.io';
import redisAdapter from 'socket.io-redis';
import { loadConfig } from '../../libs/configs';
import { log } from '../../libs/logger';

const tag = '[socketio-initiator]';

export const initSocketIO = () => {
  log.info(`${tag} preparing socket.io..`);
  const io = SocketIO();

  const useRedis = loadConfig('WEBSOCKET_USE_REDIS', {
    mandantory: false,
    defaultValue: null,
  });

  if (useRedis) {
    log.info(`${tag} using redis pub-sub on socket.io`);
    const host = loadConfig('WEBSOCKET_REDIS_HOST');
    const port = loadConfig('WEBSOCKET_REDIS_PORT');
    io.adapter(redisAdapter({ host, port }));
  }

  log.info(`${tag} socket.io ready`);
  return io;
};
