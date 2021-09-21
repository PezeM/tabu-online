import { LobbyKeys, LobbySettings } from '@shared/interfaces/lobby';
import { LobbyLanguage } from '@shared/enums/lobby';
import { ClientSocket } from '@interfaces/socket.interface';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { app } from '@/server';
import { isLobbyLanguage } from '@utils/type-guards';
import { SettingsHandler } from '@services/settingsHandlers/settings.handler';
import { logger } from '@utils/logger';
import { LobbySettingsUpdateException } from '@exceptions/LobbySettingsUpdateException';
import { lobbyManager } from '@/managers/lobby.manager';
import {
  BaseSettingsHandler,
  LanguageSettingHandler,
  MaxPlayersSettingHandler,
  MaxSkipsSettingHandler,
  PointsToWinSettingHandler,
  RoundTimeSettingHandler,
} from './settingsHandlers';
import { CardIdsSettingsHandler } from '@services/settingsHandlers/card-ids-settings.handler';

const DEFAULT_LANGUAGE = LobbyLanguage.EN;

export class LobbySettingsService {
  private readonly handlers: BaseSettingsHandler<LobbyKeys>[];

  constructor() {
    this.handlers = [
      new LanguageSettingHandler(),
      new MaxPlayersSettingHandler(),
      new PointsToWinSettingHandler(),
      new MaxSkipsSettingHandler(),
      new RoundTimeSettingHandler(),
      new CardIdsSettingsHandler(),
    ];
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
      cardIds: [],
    };
  }

  public async updateSettings(socket: ClientSocket, newSettings: Partial<LobbySettings>) {
    if (!socket.clientUser) return;

    const lobby = lobbyManager.getLobbyForClient(socket.clientUser);
    if (!lobby) return;

    if (!lobby.isOwner(socket.clientUser)) {
      socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.notAnOwner', 'Error');
      return;
    }

    for (const key of Object.keys(newSettings) as LobbyKeys[]) {
      const value = newSettings[key];
      const handler = SettingsHandler.get(key);

      if (!handler) {
        logger.warn(`No lobby setting handler for key ${key}`);

        return;
      }

      try {
        await handler.process(socket, lobby, value);
      } catch (e) {
        if (e instanceof LobbySettingsUpdateException) {
          socket.emit(SERVER_EVENT_NAME.LobbySettingsUpdateFailed, e.message);
          return;
        }

        logger.warn(`Couldn't update lobby setting ${key}:${value}`, {
          error: e.message,
          socketId: socket.id,
          lobbyId: lobby.id,
        });

        return;
      }
    }

    lobby.settings = { ...lobby.settings, ...newSettings };
    app.ioServer().in(lobby.id).emit(SERVER_EVENT_NAME.LobbySettingsChanged, lobby.settings);
  }
}
