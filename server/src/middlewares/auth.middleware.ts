import { ClientSocket } from '@interfaces/socket.interface';

export const authMiddleware = (socket: ClientSocket, next: Function) => {
  const username = socket.handshake.auth.username;

  if (!username) {
    return next(new Error('invalid username'));
  }

  socket.username = username;
  next();
};
