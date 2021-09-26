import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from '@shared/constants/events';
import { isEmpty } from '@utils/util';
import { Client } from '@models/client.model';
import { ClientSocket } from '@interfaces/socket.interface';
import { clientManager } from '@/managers/client.manager';
import { Socket } from 'socket.io';
import { PerformanceLog } from '@utils/performance-logger';
import { Gateway, OnEvent } from '@utils/gateway.decorator';
import { lobbyManager } from '@/managers/lobby.manager';
import { AuthService } from '@services/auth.service';

@Gateway
export class AuthGateway {
  private readonly _authService: AuthService;

  constructor() {
    this._authService = new AuthService();
  }

  @OnEvent(CLIENT_EVENT_NAME.Test)
  protected testClientEvent(socket: ClientSocket, msg: string) {
    console.log('Inside test client event', socket.id, msg);
  }

  @OnEvent(CLIENT_EVENT_NAME.JoinLobby)
  @PerformanceLog()
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

  @OnEvent(CLIENT_EVENT_NAME.CreateLobby)
  @PerformanceLog()
  protected async onCreateLobby(socket: ClientSocket, username: string, language: string) {
    if (isEmpty(username)) {
      socket.emit(SERVER_EVENT_NAME.CouldntCreateOrJoinLobby);
      socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.invalidUsername', 'Error');
      return;
    }

    const client = new Client(socket, username);
    await this._authService.createLobby(client, language);
  }

  @OnEvent(CLIENT_EVENT_NAME.Disconnect)
  @PerformanceLog()
  protected onDisconnect(socket: Socket) {
    const client = clientManager.getClient(socket.id);
    if (!client) return;

    const lobby = lobbyManager.getLobbyForClient(client);
    if (lobby) {
      lobby.remove(client);
    }

    clientManager.removeClient(client);
  }
}
