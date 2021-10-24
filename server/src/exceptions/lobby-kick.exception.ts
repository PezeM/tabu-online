import { InternalServerErrorException } from '@exceptions/internal-server.exception';

export class LobbyKickException extends InternalServerErrorException {
  constructor(message?: string | object | any) {
    super(message, 'Lobby Kick Client Exception');
  }
}
