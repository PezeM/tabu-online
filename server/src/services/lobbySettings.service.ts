import { LobbySettings } from '@shared/interfaces/lobby';
import { LobbyLanguage } from '@shared/enums/lobby';

const DEFAULT_LANGUAGE = LobbyLanguage.EN;

export class LobbySettingsService {
  public createDefaultSettings(language: string): LobbySettings {
    if (!Object.values(LobbyLanguage).includes(language as LobbyLanguage)) {
      language = DEFAULT_LANGUAGE;
    }

    return {
      language: language as LobbyLanguage,
      maxPlayers: 10,
      maximumNumberOfSkips: 10,
      pointsToWin: 25,
      roundTime: 1 * 60 * 1000,
    };
  }
}
