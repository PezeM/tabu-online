import { ClientSocket } from '@interfaces/socket.interface';
import { clientManager } from '@/managers/client.manager';

export const authMiddleware = (socket: ClientSocket, next: Function) => {
  const username = socket.handshake.auth.username;
  const sessionId = socket.handshake.auth.sessionId;

  if (!username) {
    return next(new Error('invalid username'));
  }

  socket.username = username;

  if (sessionId) {
    const client = clientManager.getClient(sessionId);
    if (client) {
      socket.clientUser = client;
    }
  }

  next();
};
