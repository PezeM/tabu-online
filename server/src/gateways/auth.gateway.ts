import { BaseGateway } from '@/gateways/base.gateway';
import { CLIENT_EVENT_NAME } from '../../../shared/constants/events';
import { Socket } from 'socket.io';

export class AuthGateway extends BaseGateway {
  constructor() {
    super();
  }

  protected testClientEvent(socket: Socket, msg: string) {
    console.log('Inside test client event', socket.id, msg);
  }

  protected mapEvents(): void {
    console.log('In mapping events');
    this.map.set(CLIENT_EVENT_NAME.Test, this.testClientEvent);
  }
}
