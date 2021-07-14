import { IoAdapter } from '@nestjs/platform-socket.io';

export class SocketAdapter extends IoAdapter {
  public createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, {
      ...options,
      origins: ['http://localhost:3000', 'http://127.0.0.1:3000'],
      transport: ['websocket'],
      // origins: true,
      // cors: true,
    });

    // server.use((req: any, res: any, next: any) => {
    //   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    //   res.header('Access-Control-Allow-Credentials', true);
    //
    //   next();
    // });

    return server;
  }
}
