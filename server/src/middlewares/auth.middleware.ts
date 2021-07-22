import { ClientSocket } from '@interfaces/socket.interface';
import { clientManager } from '@/managers/client.manager';

export const authMiddleware = (socket: ClientSocket, next: Function) => {
  const username = socket.handshake.auth.username;

  if (!username) {
    return next(new Error('invalid username'));
  }

  socket.username = username;

  const client = clientManager.getClient(socket.id);
  if (client) {
    socket.clientUser = client;
  }

  next();
};
