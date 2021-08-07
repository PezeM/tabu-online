import { LobbySettings } from '@shared/interfaces/lobby';
import { LobbyLanguage } from '@shared/enums/lobby';
import { ClientSocket } from '@interfaces/socket.interface';
import { Lobby } from '@models/lobby.model';
import { SERVER_EVENT_NAME } from '@shared/constants/events';

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

  public updateSettings(socket: ClientSocket, lobby: Lobby, newSettings: Partial<LobbySettings>) {
    if (socket.clientUser) return;
    if (!lobby.isOwner(socket.clientUser)) {
      socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.notAnOwner', 'Error');
      return;
    }

    // Update settings
    // Emit events to all users
  }
}
