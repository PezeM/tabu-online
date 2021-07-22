import { CLIENT_EVENT_NAME } from '@shared/constants/events';
import { EventsFromClientOnServer } from '@interfaces/socket.interface';

export abstract class BaseGateway {
  protected readonly eventsMap: Map<CLIENT_EVENT_NAME, EventsFromClientOnServer[CLIENT_EVENT_NAME]>;

  protected constructor() {
    this.eventsMap = new Map();
    this.mapEvents();
  }

  get handlers() {
    return this.eventsMap;
  }

  protected abstract mapEvents(): void;
}
