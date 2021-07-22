import { BaseGateway } from '@/gateways/base.gateway';
import { CLIENT_EVENT_NAME } from '@shared/constants/events';
import { ClientSocket } from '@interfaces/socket.interface';
import { lobbyManager } from '@/managers/lobby.manager';

export class LobbyGateway extends BaseGateway {
  constructor() {
    super();
  }

  protected onDisconnect(socket: ClientSocket) {
    console.log('Here kurde');
    if (!socket.clientUser) return;

    console.log('1');
    const lobby = lobbyManager.getLobbyForSocketId(socket.id);
    if (!lobby) return;
    console.log('2');
    lobby.remove(socket.clientUser);

    console.log('5', lobbyManager);
  }

  protected mapEvents(): void {
    this.eventsMap.set(CLIENT_EVENT_NAME.Disconnect, this.onDisconnect);
  }
}
