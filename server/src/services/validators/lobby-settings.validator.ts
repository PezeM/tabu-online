import { Lobby } from '@models/lobby.model';
import { LobbySettingsValidatorException } from '@/exceptions';

export class LobbySettingsValidator {
  public validateLobbySettings(lobby: Lobby) {
    if (lobby.isGameStarted) {
      throw new LobbySettingsValidatorException('lobby.alreadyInGame');
    }

    if (!lobby.cardSets || lobby.cardSets.length <= 0) {
      throw new LobbySettingsValidatorException('error.noCardSelected');
    }

    if (!lobby.settings.cardIds || lobby.settings.cardIds.length <= 0) {
      throw new LobbySettingsValidatorException('error.noCardSelected');
    }

    // if (lobby.membersCount < 2) {
    //   throw new LobbySettingsValidatorException('error.minimumNumberOfPlayers');
    // }
  }
}
