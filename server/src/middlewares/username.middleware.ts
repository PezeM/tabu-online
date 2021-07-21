import { ClientSocket } from '@interfaces/socket.interface';

export const usernameMiddleware = (socket: ClientSocket, next: Function) => {
  console.log('1 here', socket.handshake.auth);
  const username = socket.handshake.auth.username;
  if (!username) {
    console.log('2 here');
    return next(new Error('invalid username'));
  }

  socket.username = username;
  console.log('3 here');
  next();
};
