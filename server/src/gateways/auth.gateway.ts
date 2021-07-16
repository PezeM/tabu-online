import { BaseGateway } from '@/gateways/base.gateway';
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from '../../../shared/constants/events';
import { Socket } from 'socket.io';
import { isEmpty } from '@utils/util';
import { generateRandomId } from '../../../shared/utils/uuid';

export class AuthGateway extends BaseGateway {
  constructor() {
    super();
  }

  protected testClientEvent(socket: Socket, msg: string) {
    console.log('Inside test client event', socket.id, msg);
  }

  protected onJoinLobby(socket: Socket, username: string, lobbyId: string) {}

  protected onCreateLobby(socket: Socket, username: string) {
    if (isEmpty(username)) {
      socket.emit(SERVER_EVENT_NAME.UserLobbyInvalidUsername, 'Username is empty');
      return;
    }

    const id = generateRandomId();
    console.log('Random id ${id}', id);
    socket.emit(SERVER_EVENT_NAME.UserJoinLobby);
    socket.broadcast.emit(SERVER_EVENT_NAME.UserJoinedLobby, socket.id);
    // create user
    // create lobby
    // add user as owner lobby
  }

  protected mapEvents(): void {
    console.log('In mapping events');
    this.eventsMap.set(CLIENT_EVENT_NAME.JoinLobby, this.onJoinLobby);
    this.eventsMap.set(CLIENT_EVENT_NAME.CreateLobby, this.onCreateLobby);
    this.eventsMap.set(CLIENT_EVENT_NAME.Test, this.testClientEvent);
  }
}
