import { CLIENT_EVENT_NAME } from '@shared/constants/events';
import { ClientSocket } from '@interfaces/socket.interface';
import { lobbyManager } from '@/managers/lobby.manager';
import { clientManager } from '@/managers/client.manager';
import { LobbyService } from '@services/lobby.service';
import { UpdateSettingsDto } from '@dtos/settings.lobby.dto';
import { LobbySettingsService } from '@services/lobbySettings.service';
import { validateRequestData } from '@utils/dataValidation';
import { Gateway, OnEvent } from '@utils/gateway.decorator';
import { PerformanceLog } from '@utils/performance-logger';

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
    if (!socket.clientUser) return;

    if (!(await validateRequestData(socket, UpdateSettingsDto, newSettings))) return;

    await this._lobbySettingsService.updateSettings(socket, newSettings);
  }
}
