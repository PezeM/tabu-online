import { BaseGateway } from '@/gateways/base.gateway';
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from '@shared/constants/events';
import { Socket } from 'socket.io';
import { isEmpty } from '@utils/util';
import { Auth2Service } from '@services/auth2.service';
import { Client } from '@models/client.model';

export class AuthGateway extends BaseGateway {
  private readonly authService: Auth2Service;

  constructor() {
    super();
    this.authService = new Auth2Service();
  }

  protected testClientEvent(socket: Socket, msg: string) {
    console.log('Inside test client event', socket.id, msg);
  }

  protected onJoinLobby(socket: Socket, username: string, lobbyId: string) {
    if (isEmpty(username)) {
      socket.emit(SERVER_EVENT_NAME.UserLobbyInvalidUsername);
      socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.invalidUsername', 'Error');

      return;
    }

    const client = new Client(socket, username);
    this.authService.joinLobby(client, lobbyId);
  }

  protected onCreateLobby(socket: Socket, username: string) {
    if (isEmpty(username)) {
      socket.emit(SERVER_EVENT_NAME.UserLobbyInvalidUsername);
      socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.invalidUsername', 'Error');
      return;
    }

    const client = new Client(socket, username);
    this.authService.createLobby(client);
  }

  protected mapEvents(): void {
    this.eventsMap.set(CLIENT_EVENT_NAME.JoinLobby, this.onJoinLobby);
    this.eventsMap.set(CLIENT_EVENT_NAME.CreateLobby, this.onCreateLobby);
    this.eventsMap.set(CLIENT_EVENT_NAME.Test, this.testClientEvent);
  }
}
