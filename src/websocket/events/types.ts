import { Socket } from 'socket.io';

export interface RoomHandler {
  event: string;
  handler: (socket: Socket) => Promise<void>;
}
