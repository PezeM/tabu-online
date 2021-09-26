import { Socket } from 'socket.io';
import { logger, logSocket } from '@utils/logger';

export const socketLogMiddleware = (socket: Socket, eventName: string, ...rest) => {
  logger.debug(`[SOCKET] ID: ${socket.id} EventName: ${eventName}`, logSocket(socket), {
    eventName,
    args: rest,
  });
};
