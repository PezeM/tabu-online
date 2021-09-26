import { Gateway, OnEvent } from '@utils/gateway.decorator';
import { CLIENT_EVENT_NAME } from '@shared/constants';
import { ClientSocket } from '@interfaces/socket.interface';
import { clientManager } from '@/managers/client.manager';
import { gameManager } from '@/managers/game.manager';

@Gateway
export class GameGateway {
  @OnEvent(CLIENT_EVENT_NAME.Disconnect)
  protected onDisconnect(socket: ClientSocket) {
    const client = clientManager.getClient(socket.id);
    if (!client) return;

    const game = gameManager.getGameForSocketId(socket.id);
    if (!game) return;

    game.removePlayer(socket.id);
  }
}
