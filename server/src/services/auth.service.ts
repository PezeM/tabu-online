import { Client } from '@models/client.model';
import { Lobby } from '@models/lobby.model';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { lobbyManager } from '@/managers/lobby.manager';
import { clientManager } from '@/managers/client.manager';
import { logger } from '@utils/logger';
import { CardSetRepository } from '@/repositories/card-set.repository';
import { LobbySettingsService } from '@services/lobby-settings.service';

export class AuthService {
  private readonly lobbySettingsService = new LobbySettingsService();
  private readonly cardSetRepository = new CardSetRepository();

  private static emitActionError(client: Client, errorName: string) {
    client.socket.emit(SERVER_EVENT_NAME.CouldntCreateOrJoinLobby);
    client.socket.emit(SERVER_EVENT_NAME.Notification, errorName, 'error');
    clientManager.removeClient(client);
  }

  public async createLobby(owner: Client, language: string, password?: string) {
    if (lobbyManager.getLobbyForSocketId(owner.socketId)) {
      AuthService.emitActionError(owner, 'lobby.userAlreadyInLobby');
      return;
    }

    const settings = this.lobbySettingsService.createDefaultSettings(language);

    let lobby: Lobby;
    try {
      const cardSets = await this.cardSetRepository.getCardSetsForLanguage(settings.language);
      lobby = new Lobby(owner, settings, cardSets, password);
      lobbyManager.addLobby(lobby);
    } catch (e) {
      lobbyManager.removeLobby(lobby);
      logger.error('[CREATE LOBBY] Error while creating lobby', { error: e });
      AuthService.emitActionError(owner, 'lobby.errorCreatingLobby');
    }
  }

  public joinLobby(client: Client, lobbyId: string, password?: string): void {
    const lobby = lobbyManager.getLobby(lobbyId);

    if (!lobby) {
      AuthService.emitActionError(client, 'lobby.doesntExist');
      return;
    }

    if (lobby.password && lobby.password !== password) {
      AuthService.emitActionError(client, 'lobby.incorrectPassword');
      return;
    }

    try {
      lobby.addClient(client);
    } catch (e) {
      AuthService.emitActionError(client, e.message);
    }
  }
}
