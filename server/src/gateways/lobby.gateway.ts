import { BaseGateway } from '@/gateways/base.gateway';
import { CLIENT_EVENT_NAME } from '@shared/constants/events';
import { ClientSocket } from '@interfaces/socket.interface';
import { lobbyManager } from '@/managers/lobby.manager';
import { clientManager } from '@/managers/client.manager';
import { LobbyService } from '@services/lobby.service';

export class LobbyGateway extends BaseGateway {
  private readonly _lobbyService: LobbyService;

  constructor() {
    super();

    this._lobbyService = new LobbyService();
  }

  protected onDisconnect(socket: ClientSocket) {
    const client = clientManager.getClient(socket.id);
    if (!client) return;

    const lobby = lobbyManager.getLobbyForSocketId(socket.id);
    if (!lobby) return;

    lobby.remove(client);
  }

  protected onChangeTeam(socket: ClientSocket) {
    console.log('On change team');
    if (!socket.clientUser) return;
    console.log('On change team 2');

    const lobby = lobbyManager.getLobbyForClient(socket.clientUser);
    if (!lobby) return;

    this._lobbyService.changeTeam(socket.clientUser, lobby);
  }

  protected mapEvents(): void {
    this.eventsMap.set(CLIENT_EVENT_NAME.Disconnecting, this.onDisconnect);
    this.eventsMap.set(CLIENT_EVENT_NAME.ChangeTeam, this.onChangeTeam);
  }
}
