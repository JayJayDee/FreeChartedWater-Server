import { Socket } from 'socket.io';

export const joinWrap =
  (socket: Socket, roomName: string): Promise<void> =>
    new Promise((resolve, reject) =>
      socket.join(roomName, (err) =>
        err ? reject(err) : resolve()));
