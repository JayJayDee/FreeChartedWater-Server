import SocketIO from 'socket.io';

export const initSocketIO = () => {
  const io = SocketIO();
  return io;
};
