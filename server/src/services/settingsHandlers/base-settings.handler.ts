import { ClientSocket } from '@interfaces/socket.interface';
import { Lobby } from '@models/lobby.model';

export abstract class BaseSettingsHandler {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  abstract process(socket: ClientSocket, lobby: Lobby): Promise<boolean>;
}
