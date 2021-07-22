import { BaseGateway } from '@/gateways/base.gateway';
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from '@shared/constants/events';
import { isEmpty } from '@utils/util';
import { Auth2Service } from '@services/auth2.service';
import { Client } from '@models/client.model';
import { ClientSocket } from '@interfaces/socket.interface';
import { clientManager } from '@/managers/client.manager';

export class AuthGateway extends BaseGateway {
  private readonly authService: Auth2Service;

  constructor() {
    super();
    this.authService = new Auth2Service();
  }

  protected testClientEvent(socket: ClientSocket, msg: string) {
    console.log('Inside test client event', socket.id, msg);
  }

  protected onJoinLobby(socket: ClientSocket, username: string, lobbyId: string) {
    if (isEmpty(username)) {
      socket.emit(SERVER_EVENT_NAME.CouldntCreateOrJoinLobby);
      socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.invalidUsername', 'Error');
      return;
    }

    if (isEmpty(lobbyId)) {
      socket.emit(SERVER_EVENT_NAME.CouldntCreateOrJoinLobby);
      socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.doesntExist', 'Error');
      return;
    }

    const client = new Client(socket, username);
    this.authService.joinLobby(client, lobbyId);
  }

  protected onCreateLobby(socket: ClientSocket, username: string, language: string) {
    if (isEmpty(username)) {
      socket.emit(SERVER_EVENT_NAME.CouldntCreateOrJoinLobby);
      socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.invalidUsername', 'Error');
      return;
    }

    const client = new Client(socket, username);
    this.authService.createLobby(client, language);
  }

  protected onDisconnect(socket: ClientSocket) {
    if (!socket.clientUser) return;

    clientManager.removeClient(socket.clientUser.sessionId);
  }

  protected mapEvents(): void {
    this.eventsMap.set(CLIENT_EVENT_NAME.JoinLobby, this.onJoinLobby);
    this.eventsMap.set(CLIENT_EVENT_NAME.CreateLobby, this.onCreateLobby);
    this.eventsMap.set(CLIENT_EVENT_NAME.Test, this.testClientEvent);
    this.eventsMap.set(CLIENT_EVENT_NAME.Disconnect, this.onDisconnect);
  }
}
