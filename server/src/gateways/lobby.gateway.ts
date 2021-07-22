import { BaseGateway } from '@/gateways/base.gateway';
import { CLIENT_EVENT_NAME } from '@shared/constants/events';
import { ClientSocket } from '@interfaces/socket.interface';
import { lobbyManager } from '@/managers/lobby.manager';
import { clientManager } from '@/managers/client.manager';

export class LobbyGateway extends BaseGateway {
  constructor() {
    super();
  }

  protected onDisconnect(socket: ClientSocket) {
    const client = clientManager.getClient(socket.id);
    if (!client) return;

    const lobby = lobbyManager.getLobbyForSocketId(socket.id);
    if (!lobby) return;

    lobby.remove(client);
  }

  protected mapEvents(): void {
    this.eventsMap.set(CLIENT_EVENT_NAME.Disconnecting, this.onDisconnect);
  }
}
