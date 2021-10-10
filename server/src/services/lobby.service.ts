import { Client } from '@models/client.model';
import { Lobby } from '@models/lobby.model';
import { Team } from '@shared/enums/client';
import { app } from '@/server';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { lobbyManager } from '@/managers/lobby.manager';
import { LobbySettingsValidator } from '@services/validators/lobby-settings.validator';
import { InternalServerErrorException } from '@/exceptions';
import { logClient, logError, logger, logLobby } from '@utils/logger';
import { GameCreateService } from '@services/game-create.service';

export class LobbyService {
  private _lobbySettingsValidator = new LobbySettingsValidator();
  private _gameCreateService = new GameCreateService();

  private static validateOwnership(lobby: Lobby, client: Client) {
    if (!lobby.isOwner(client)) {
      throw new InternalServerErrorException('error.onlyOwnerCanStartTheGame');
    }
  }

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
      this._lobbySettingsValidator.validateLobbySettings(lobby);
      LobbyService.validateOwnership(lobby, client);
      await this._gameCreateService.createNewGame(lobby, client);
    } catch (e) {
      if (e instanceof InternalServerErrorException) {
        client.socket.emit(SERVER_EVENT_NAME.StartGameFailed, e.message);
      }

      logger.warn('Starting game failed.', logClient(client), logLobby(lobby), logError(e));
    }
  }
}
