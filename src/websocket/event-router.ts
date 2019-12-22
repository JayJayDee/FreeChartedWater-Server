import { Socket } from 'socket.io';
import { log } from '../libs/logger';

const tag = '[event-router]';

interface RoomHandler {
  event: string;
  handler: (socket: Socket, data: any) => Promise<void | any>;
}

export const initEventRouter =
  ({ socket, roomHandlers }: {
    socket: Socket,
    roomHandlers: RoomHandler[],
  }) => {
    log.debug(`${tag} client connected, ${socket.id}`);

    roomHandlers.forEach((handler) =>
      socket.on(handler.event, (data, callback) => {
        handler.handler(socket, data)
        .then((response) => {
          if (response) {
            callback({
              success: true,
              response,
            });
          }
        })
        .catch((err) => {
          log.error(`${tag} error occured in event:${handler.event}`);
          log.error(err);
          callback({
            success: false,
            error: err.message,
          });
        });
      }));
  };
