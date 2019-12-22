import { RoomHandler } from './types';
import { joinWrap } from './utils';
import { log } from '../../libs/logger';

const event = 'onJoinGlobal';

const room = 'global';
const tag = `[event:${event}]`;

export const onJoinGlobal = (): RoomHandler =>
  ({
    event,
    handler: async (socket, data) => {
      log.debug(`${tag} event started, ${socket.id}`);
      if (socket.rooms[room]) {
        log.debug(`${tag} already joined room. ${socket.id}`);
        return;
      }
      await joinWrap(socket, 'global');
      log.debug(`${tag} event processed, ${socket.id}`);
      return 0;
    },
  });
