import { InternalServerErrorException } from '@exceptions/internal-server.exception';

export class LobbySettingsValidatorException extends InternalServerErrorException {
  constructor(message?: string | object | any) {
    super(message, 'Lobby Settings Validator Exception');
  }
}
