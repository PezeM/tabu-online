import { LobbySettings } from '@shared/interfaces/lobby';
import { LobbyLanguage } from '@shared/enums/lobby';
import { ClientSocket } from '@interfaces/socket.interface';
import { Lobby } from '@models/lobby.model';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { app } from '@/server';
import { isLobbyLanguage } from '@utils/type-guards';

const DEFAULT_LANGUAGE = LobbyLanguage.EN;

export class LobbySettingsService {
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

  public updateSettings(socket: ClientSocket, lobby: Lobby, newSettings: Partial<LobbySettings>) {
    if (!socket.clientUser) return;
    if (!lobby.isOwner(socket.clientUser)) {
      socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.notAnOwner', 'Error');
      return;
    }

    // Update settings
    // Emit events to all users
    lobby.settings = { ...lobby.settings, ...newSettings };
    app.ioServer().in(lobby.id).emit(SERVER_EVENT_NAME.LobbySettingsChanged, lobby.settings);
  }
}
