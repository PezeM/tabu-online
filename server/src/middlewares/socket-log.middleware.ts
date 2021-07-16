import { Socket } from 'socket.io';
import { logger } from '@utils/logger';

export const socketLogMiddleware = (socket: Socket, eventName: string, ...rest) => {
  logger.debug(`[SOCKET] ID: ${socket.id} EventName: ${eventName}`, { socketId: socket.id, eventName, args: rest });
};
