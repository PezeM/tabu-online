import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from '@shared/constants/events';
import { isEmpty } from '@utils/util';
import { Client } from '@models/client.model';
import { ClientSocket } from '@interfaces/socket.interface';
import { clientManager } from '@/managers/client.manager';
import { Socket } from 'socket.io';
import { Gateway, OnEvent } from '@utils/gateway.decorator';
import { lobbyManager } from '@/managers/lobby.manager';
import { AuthService } from '@services/auth.service';
import { PerformanceLog } from '@utils/performance.logger';

@Gateway
export class AuthGateway {
  private readonly _authService: AuthService;

  constructor() {
    this._authService = new AuthService();
  }

  private static emitCouldntCreateLobby(socket: ClientSocket, errorName: string) {
    socket.emit(SERVER_EVENT_NAME.CouldntCreateOrJoinLobby);
    socket.emit(SERVER_EVENT_NAME.Notification, errorName, 'error');
  }

  @OnEvent(CLIENT_EVENT_NAME.JoinLobby)
  @PerformanceLog()
  protected onJoinLobby(
    socket: ClientSocket,
    username: string,
    lobbyId: string,
    password?: string,
  ) {
    if (isEmpty(username)) {
      return AuthGateway.emitCouldntCreateLobby(socket, 'lobby.invalidUsername');
    }

    if (isEmpty(lobbyId)) {
      return AuthGateway.emitCouldntCreateLobby(socket, 'lobby.doesntExist');
    }

    const client = new Client(socket, username);
    this._authService.joinLobby(client, lobbyId, password);
  }

  @OnEvent(CLIENT_EVENT_NAME.CreateLobby)
  @PerformanceLog()
  protected async onCreateLobby(
    socket: ClientSocket,
    username: string,
    language: string,
    password?: string,
  ) {
    if (isEmpty(username)) {
      return AuthGateway.emitCouldntCreateLobby(socket, 'lobby.invalidUsername');
    }

    const client = new Client(socket, username);
    await this._authService.createLobby(client, language, password);
  }

  @OnEvent(CLIENT_EVENT_NAME.Disconnect)
  @PerformanceLog()
  protected onDisconnect(socket: Socket) {
    const client = clientManager.getClient(socket.id);
    if (!client) return;

    const lobby = lobbyManager.getLobbyForClient(client);
    if (lobby) {
      lobby.removeClient(client);
    }

    clientManager.removeClient(client);
  }
}
