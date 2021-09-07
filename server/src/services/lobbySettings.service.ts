import { LobbyKeys, LobbySettings } from '@shared/interfaces/lobby';
import { LobbyLanguage } from '@shared/enums/lobby';
import { ClientSocket } from '@interfaces/socket.interface';
import { Lobby } from '@models/lobby.model';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { app } from '@/server';
import { isLobbyLanguage } from '@utils/type-guards';
import { SettingsHandler } from '@services/settingsHandlers/settings.handler';
import { logger } from '@utils/logger';
import { LanguageSettingHandler } from '@services/settingsHandlers/language-setting.handler';

const DEFAULT_LANGUAGE = LobbyLanguage.EN;

export class LobbySettingsService {
  constructor() {
    new LanguageSettingHandler();
  }

  public createDefaultSettings(language: string): LobbySettings {
    if (!isLobbyLanguage(language)) {
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

  public async updateSettings(
    socket: ClientSocket,
    lobby: Lobby,
    newSettings: Partial<LobbySettings>,
  ) {
    if (!socket.clientUser) return;
    if (!lobby.isOwner(socket.clientUser)) {
      socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.notAnOwner', 'Error');
      return;
    }

    for (const key of Object.keys(newSettings) as LobbyKeys[]) {
      // Get handler
      // Use handler
      const value = newSettings[key];
      const handler = SettingsHandler.get(key);

      if (!handler) {
        logger.warn(`No lobby setting handler for key ${key}`);
        return;
      }

      const result = await new handler().process(socket, lobby);
    }

    // Update settings
    // Emit events to all users
    lobby.settings = { ...lobby.settings, ...newSettings };
    app.ioServer().in(lobby.id).emit(SERVER_EVENT_NAME.LobbySettingsChanged, lobby.settings);
  }
}
