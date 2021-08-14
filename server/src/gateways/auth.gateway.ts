import { BaseGateway } from '@/gateways/base.gateway';
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from '@shared/constants/events';
import { isEmpty } from '@utils/util';
import { Auth2Service } from '@services/auth2.service';
import { Client } from '@models/client.model';
import { ClientSocket } from '@interfaces/socket.interface';
import { clientManager } from '@/managers/client.manager';
import { Socket } from 'socket.io';
import { CardSet, CardSetModel } from '@models/card-set.model';

export class AuthGateway extends BaseGateway {
  private readonly _authService: Auth2Service;

  constructor() {
    super();
    this._authService = new Auth2Service();
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
    this._authService.joinLobby(client, lobbyId);
  }

  protected async onCreateLobby(socket: ClientSocket, username: string, language: string) {
    if (isEmpty(username)) {
      socket.emit(SERVER_EVENT_NAME.CouldntCreateOrJoinLobby);
      socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.invalidUsername', 'Error');
      return;
    }

    // Something there
    const cardSets = await CardSetModel.find();
    console.log('Card sets', cardSets);

    const client = new Client(socket, username);
    this._authService.createLobby(client, language);
  }

  protected onDisconnect(socket: Socket) {
    const client = clientManager.getClient(socket.id);
    if (!client) return;

    clientManager.removeClient(client);
  }

  protected mapEvents(): void {
    this.eventsMap.set(CLIENT_EVENT_NAME.JoinLobby, this.onJoinLobby);
    this.eventsMap.set(CLIENT_EVENT_NAME.CreateLobby, this.onCreateLobby);
    this.eventsMap.set(CLIENT_EVENT_NAME.Test, this.testClientEvent);
    this.eventsMap.set(CLIENT_EVENT_NAME.Disconnect, this.onDisconnect);
  }
}
