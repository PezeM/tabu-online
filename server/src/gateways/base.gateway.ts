import { CLIENT_EVENT_NAME } from '../../../shared/constants/events';
import { EventsFromClientOnServer } from '@interfaces/socket.interface';

export abstract class BaseGateway {
  protected readonly map: Map<CLIENT_EVENT_NAME, EventsFromClientOnServer[CLIENT_EVENT_NAME]>;

  protected constructor() {
    this.map = new Map();
    this.mapEvents();
  }

  get handlers() {
    return this.map;
  }

  protected abstract mapEvents(): void;
}
