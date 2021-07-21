import { ClientSocket } from '@interfaces/socket.interface';

export const usernameMiddleware = (socket: ClientSocket, next: Function) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error('invalid username'));
  }

  socket.username = username;
  next();
};
