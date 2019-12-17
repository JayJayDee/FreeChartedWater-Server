import { RoomHandler } from './types';

const event = 'onJoinGlobal';

export const onJoinGlobal = (): RoomHandler =>
  ({
    event,
    handler: async (socket) => {
      console.log('!');
    },
  });
