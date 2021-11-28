import { InternalServerErrorException } from '@exceptions/internal-server.exception';

export class LobbyKickClientException extends InternalServerErrorException {
  constructor(public readonly clientId?: string, message?: string | object | any) {
    super(message, `Lobby Kick Client Exception for client ${clientId}`);
  }
}
