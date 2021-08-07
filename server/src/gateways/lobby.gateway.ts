import { BaseGateway } from '@/gateways/base.gateway';
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from '@shared/constants/events';
import { ClientSocket } from '@interfaces/socket.interface';
import { lobbyManager } from '@/managers/lobby.manager';
import { clientManager } from '@/managers/client.manager';
import { LobbyService } from '@services/lobby.service';
import { LobbySettings } from '@shared/interfaces/lobby';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UpdateSettingsDto } from '@dtos/settings.lobby.dto';
import { LobbySettingsService } from "@services/lobbySettings.service";

export class LobbyGateway extends BaseGateway {
  private readonly _lobbyService: LobbyService;
  private readonly _lobbySettingsService: LobbySettingsService;

  constructor() {
    super();

    this._lobbyService = new LobbyService();
    this._lobbySettingsService = new LobbySettingsService();
  }

  protected onDisconnect(socket: ClientSocket) {
    const client = clientManager.getClient(socket.id);
    if (!client) return;

    const lobby = lobbyManager.getLobbyForSocketId(socket.id);
    if (!lobby) return;

    lobby.remove(client);
  }

  protected onChangeTeam(socket: ClientSocket) {
    if (!socket.clientUser) return;

    const lobby = lobbyManager.getLobbyForClient(socket.clientUser);
    if (!lobby) return;

    this._lobbyService.changeTeam(socket.clientUser, lobby);
  }

  protected async onUpdateSettings(socket: ClientSocket, newSettings: Partial<LobbySettings>) {
    if (!socket.clientUser) return;

    const lobby = lobbyManager.getLobbyForClient(socket.clientUser);
    if (!lobby) return;

    try {
      await validateOrReject(plainToClass(UpdateSettingsDto, newSettings), {
        whitelist: true,
        skipMissingProperties: true,
      });
    } catch (e) {
      if (e instanceof Array) {
        const message = Object.values(e[0].constraints)[0] as string;
        socket.emit(SERVER_EVENT_NAME.Notification, message, 'Error');
      }

      return;
    }

    // Update settings
    this._lobbySettingsService.updateSettings(socket, lobby, newSettings);
  }

  protected mapEvents(): void {
    this.eventsMap.set(CLIENT_EVENT_NAME.Disconnecting, this.onDisconnect);
    this.eventsMap.set(CLIENT_EVENT_NAME.ChangeTeam, this.onChangeTeam);
    this.eventsMap.set(CLIENT_EVENT_NAME.LobbyUpdateSettings, this.onUpdateSettings);
  }
}
