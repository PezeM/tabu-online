import { Client } from '@models/client.model';
import { Lobby } from '@models/lobby.model';
import { Team } from '@shared/enums/client';
import { app } from '@/server';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { lobbyManager } from '@/managers/lobby.manager';
import { LobbySettingsValidator } from '@services/validators/lobby-settings.validator';
import { InternalServerErrorException } from '@/exceptions';
import { logClient, logError, logger, logLobby } from '@utils/logger';

export class LobbyService {
  private lobbySettingsValidator = new LobbySettingsValidator();

  changeTeam(client: Client, lobby: Lobby) {
    client.team = client.team === Team.Blue ? Team.Red : Team.Blue;

    // Emit to all users in lobby that user changed team
    app
      .ioServer()
      .in(lobby.id)
      .emit(SERVER_EVENT_NAME.LobbyUserChangedTeam, client.id, client.team);
  }

  public async startGame(client: Client) {
    const lobby = lobbyManager.getLobbyForClient(client);
    if (!lobby) return;

    try {
      this.lobbySettingsValidator.validateLobbySettings(lobby);
    } catch (e) {
      if (e instanceof InternalServerErrorException) {
        client.socket.emit(SERVER_EVENT_NAME.StartGameFailed, e.message);
      }

      logger.warn('Starting game failed.', logClient(client), logLobby(lobby), logError(e));

      return;
    }

    // Validate settings
    // Validate if is owner and game can be started
    // Load cards from db and start game
  }
}
