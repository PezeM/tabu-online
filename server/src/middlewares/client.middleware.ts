import { clientManager } from '@/managers/client.manager';
import { ClientSocket } from '@interfaces/socket.interface';

export const socketClientMiddleware = (socket: ClientSocket) => {
  const client = clientManager.getClient(socket.id);
  if (client) {
    socket.clientUser = client;
  }
};
