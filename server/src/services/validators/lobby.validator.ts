import { Lobby } from '@models/lobby.model';
import { Client } from '@models/client.model';
import { InternalServerErrorException } from '@/exceptions';

export class LobbyValidator {
  public validateOwnership(lobby: Lobby, client: Client) {
    if (!lobby.isOwner(client)) {
      throw new InternalServerErrorException('error.onlyOwnerCanStartTheGame');
    }
  }
}
