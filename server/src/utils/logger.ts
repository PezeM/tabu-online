import config from 'config';
import fs from 'fs';
import path from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { Socket } from 'socket.io';
import { Client } from '@models/client.model';
import { Lobby } from '@models/lobby.model';

// logs dir
const logDir: string = path.join(__dirname, config.get('log.dir'));

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const formatter = winston.format.printf(info => {
  const { level, message, timestamp, ...restMeta } = info;
  const meta = Object.keys(restMeta).length ? JSON.stringify(restMeta) : '';

  return `[${timestamp}] [${level}] ${message} ${meta}`;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    }),
    formatter,
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug',
      filename: `%DATE%.log`,
      maxFiles: 30,
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',
      filename: `%DATE%.log`,
      maxFiles: 30,
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.colorize(),
      winston.format.json(),
      formatter,
    ),
  }),
);

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export { logger, stream };

export const logSocket = (socket: Socket) => ({ socket: { socketId: socket.id } });

export const logClient = (client: Client) => ({
  client: {
    clientId: client.id,
    username: client.username,
  },
  ...logSocket(client.socket),
});

export const logLobby = (lobby: Lobby) => ({
  lobby: { lobbyId: lobby.id, membersCount: lobby.membersCount },
});

export const logError = (error: Error, logStack = false) => ({
  error: {
    errorMsg: error.message,
    errorName: error.name,
    errorStack: logStack ? error.stack : undefined,
  },
});
