import { CLIENT_EVENT_NAME } from '@shared/constants/events';
import { GatewayHandlers } from '@/gateways/gateway.handlers';
import { EventsFromClient } from '@shared/socket';

const _socketEvents = Symbol('_socketEvents');

interface EventHandler {
  eventName: CLIENT_EVENT_NAME;
  callback: EventsFromClient[CLIENT_EVENT_NAME];
}

export function Gateway<T extends { new (...args: any[]): {} }>(constr: T) {
  return class extends constr {
    constructor(...args: any[]) {
      super(...args);

      const eventsHandler: EventHandler[] = this[_socketEvents];
      if (eventsHandler?.length > 0) {
        for (const eventHandler of eventsHandler) {
          GatewayHandlers.addHandler({ ...eventHandler, gatewayInstance: this });
        }
      }
    }
  };
}

export function OnEvent(eventName: CLIENT_EVENT_NAME): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    if (!descriptor || typeof descriptor.value !== 'function') {
      throw new TypeError(
        `Only methods can be decorated with OnEvent. <${propertyKey.toString()}> is not a method!`,
      );
    }

    let handlers: EventHandler[] = target[_socketEvents];

    if (handlers === void 0) {
      target[_socketEvents] = handlers = [];
    } else if (!target.hasOwnProperty(_socketEvents)) {
      target[_socketEvents] = handlers = [...handlers];
    }

    handlers.push({ eventName, callback: descriptor.value });
  };
}
