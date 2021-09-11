import { ClientSocket } from '@interfaces/socket.interface';
import { Lobby } from '@models/lobby.model';
import { LobbyKeys, LobbySettings } from '@shared/interfaces/lobby';

export abstract class BaseSettingsHandler<TProperty extends LobbyKeys> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {}

  abstract process(
    socket: ClientSocket,
    lobby: Lobby,
    value: LobbySettings[TProperty],
  ): Promise<boolean>;
}
