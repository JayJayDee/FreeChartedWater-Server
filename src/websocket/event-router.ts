import { Socket } from 'socket.io';
import { log } from '../libs/logger';

const tag = '[event-router]';

interface RoomHandler {
  event: string;
  handler: (socket: Socket) => Promise<void>;
}

export const initEventRouter =
  ({ socket, roomHandlers }: {
    socket: Socket,
    roomHandlers: RoomHandler[],
  }) => {
    log.debug(`${tag} client connected, ${socket.id}`);
    // TODO: initialize event router.
  };
