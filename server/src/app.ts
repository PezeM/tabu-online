process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import config from 'config';
import express from 'express';
import { createServer, Server } from 'http';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { useExpressServer } from 'routing-controllers';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { Server as SocketServer } from 'socket.io';
import { EventsFromClient } from '../../shared/socket';
import { CLIENT_EVENT_NAME } from '../../shared/constants/events';

export class App {
  public app: express.Application;
  public httpServer: Server;
  public port: string | number;
  public env: string;
  private socketServer: SocketServer<EventsFromClient, DefaultEventsMap, DefaultEventsMap>;

  constructor(Controllers: Function[]) {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeSocketServer();
    this.initializeRoutes(Controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.httpServer.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeSocketServer() {
    this.socketServer = new SocketServer(this.httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    this.socketServer.on('connect', socket => {
      logger.info(`Socket client connected with id: ${socket.id}`, { socketId: socket.id });

      socket.on(CLIENT_EVENT_NAME.Test, (msg: string) => {
        logger.info(`Msg from client: ${msg}`, { socketId: socket.id });
        socket.emit('Dupa siema', ['Eluwa']);
      });

      socket.on('disconnect', reason => {
        logger.info(`Socket with id ${socket.id} disconnected. Reason: ${reason}`, { socketId: socket.id, reason });
      });
    });
  }

  private initializeRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      cors: {
        origin: config.get('cors.origin'),
        credentials: config.get('cors.credentials'),
      },
      controllers: controllers,
      defaultErrorHandler: false,
      routePrefix: '/api',
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
