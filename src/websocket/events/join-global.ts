import { RoomHandler } from './types';
import { joinWrap } from './utils';
import { log } from '../../libs/logger';

const event = 'onJoinGlobal';
const tag = `[event:${event}]`;

export const onJoinGlobal = (): RoomHandler =>
  ({
    event,
    handler: async (socket) => {
      console.log(socket.join);
      // await joinWrap(socket, 'global');
      log.debug(`${tag} event processed`);
    },
  });
