import { Lobby } from '@models/lobby.model';
import { LobbySettingsValidatorException } from '@/exceptions';

export class LobbySettingsValidator {
  public validateLobbySettings(lobby: Lobby) {
    throw new LobbySettingsValidatorException('Dupa');
  }
}
