import SocketIO from 'socket.io';
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
    // TODO: configure socket.io-redis adapter
  }

  log.info(`${tag} socket.io ready`);
  return io;
};
