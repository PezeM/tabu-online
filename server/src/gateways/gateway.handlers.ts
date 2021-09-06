import { ClientSocket } from '@interfaces/socket.interface';
import { EventHandler } from '@interfaces/handler.interface';

export class GatewayHandlers {
  private static handlers: EventHandler[] = [];

  public static addHandler(eventHandler: EventHandler) {
    this.handlers.push(eventHandler);
  }

  public static applyHandlerToSocket(socket: ClientSocket) {
    for (const handler of GatewayHandlers.handlers) {
      socket.on(handler.eventName, (...args) => {
        handler.callback.apply(handler.gatewayInstance, [socket, ...args]);
      });
    }
  }
}
