import { CLIENT_EVENT_NAME } from '@shared/constants/events';
import { EventsFromClient } from '@shared/socket';

export interface EventHandler {
  eventName: CLIENT_EVENT_NAME;
  callback: EventsFromClient[CLIENT_EVENT_NAME];
  gatewayInstance: any;
}
