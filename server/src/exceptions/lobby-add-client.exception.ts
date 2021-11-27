import { InternalServerErrorException } from '@exceptions/internal-server.exception';

export class LobbyAddClientException extends InternalServerErrorException {
  constructor(public readonly clientId?: string, message?: string | object | any) {
    super(message, `Lobby Add Client Exception for client ${clientId}`);
  }
}
