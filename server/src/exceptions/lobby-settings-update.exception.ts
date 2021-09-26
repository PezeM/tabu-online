import { InternalServerErrorException } from '@exceptions/internal-server.exception';

export class LobbySettingsUpdateException extends InternalServerErrorException {
  constructor(message?: string | object | any) {
    super(message, 'Lobby Settings Update Exception');
  }
}
