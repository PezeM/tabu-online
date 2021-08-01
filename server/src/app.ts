import { LobbyGateway } from '@/gateways/lobby.gateway';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import config from 'config';
import express from 'express';
import { createServer, Server } from 'http';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { useExpressServer } from 'routing-controllers';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { Server as SocketServer } from 'socket.io';
import { AuthGateway } from '@/gateways/auth.gateway';
import { socketLogMiddleware } from '@middlewares/socket-log.middleware';
import { authMiddleware } from '@middlewares/auth.middleware';
import { ServerSocket } from '@interfaces/socket.interface';

process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

export class App {
  public app: express.Application;
  public httpServer: Server;
  public port: string | number;
  public env: string;
  private _socketServer: ServerSocket;

  constructor(Controllers: Function[]) {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeSocketServer();
    this.initializeSocketMiddlewares();
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

  public ioServer() {
    return this._socketServer;
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
    this._socketServer = new SocketServer(this.httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    const gateways = [new AuthGateway(), new LobbyGateway()];

    this._socketServer.on('connect', socket => {
      socket.onAny((eventName: string, ...args) => {
        socketLogMiddleware(socket, eventName, ...args);
      });

      logger.info(`Socket client connected with id: ${socket.id}`, { socketId: socket.id });

      socket.on('disconnect', reason => {
        logger.info(`Socket with id ${socket.id} disconnected. Reason: ${reason}`, {
          socketId: socket.id,
          reason,
        });
      });

      for (const gateway of gateways) {
        gateway.handlers.forEach((value, key) => {
          socket.on(key, (...args) => {
            value.apply(gateway, [socket, ...args]);
          });
        });
      }
    });
  }

  private initializeSocketMiddlewares() {
    this._socketServer.use(authMiddleware);
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
