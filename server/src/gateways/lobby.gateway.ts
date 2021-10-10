import { CLIENT_EVENT_NAME } from '@shared/constants/events';
import { ClientSocket } from '@interfaces/socket.interface';
import { lobbyManager } from '@/managers/lobby.manager';
import { clientManager } from '@/managers/client.manager';
import { LobbyService } from '@services/lobby.service';
import { UpdateSettingsDto } from '@dtos/settings.lobby.dto';
import { Gateway, OnEvent } from '@utils/gateway.decorator';
import { LobbySettingsService } from '@services/lobby-settings.service';
import { PerformanceLog } from '@utils/performance.logger';
import { validateRequestData } from '@utils/data.validator';

@Gateway
export class LobbyGateway {
  private readonly _lobbyService: LobbyService;
  private readonly _lobbySettingsService: LobbySettingsService;

  constructor() {
    this._lobbyService = new LobbyService();
    this._lobbySettingsService = new LobbySettingsService();
  }

  @OnEvent(CLIENT_EVENT_NAME.Disconnect)
  protected onDisconnect(socket: ClientSocket) {
    const client = clientManager.getClient(socket.id);
    if (!client) return;

    const lobby = lobbyManager.getLobbyForSocketId(socket.id);
    if (!lobby) return;

    lobby.remove(client);
  }

  @OnEvent(CLIENT_EVENT_NAME.ChangeTeam)
  protected onChangeTeam(socket: ClientSocket) {
    if (!socket.clientUser) return;

    const lobby = lobbyManager.getLobbyForClient(socket.clientUser);
    if (!lobby) return;

    this._lobbyService.changeTeam(socket.clientUser, lobby);
  }

  @OnEvent(CLIENT_EVENT_NAME.LobbyUpdateSettings)
  @PerformanceLog()
  protected async onUpdateSettings(socket: ClientSocket, newSettings: Partial<UpdateSettingsDto>) {
    if (!(await validateRequestData(socket, UpdateSettingsDto, newSettings))) return;

    await this._lobbySettingsService.updateSettings(socket, newSettings);
  }

  @OnEvent(CLIENT_EVENT_NAME.TryStartGame)
  @PerformanceLog()
  protected async onTryStartGame(socket: ClientSocket) {
    if (!socket.clientUser) return;

    await this._lobbyService.startGame(socket.clientUser);
  }
}
