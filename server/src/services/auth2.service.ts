import { Client } from '@models/client.model';
import { Lobby } from '@models/lobby.model';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { lobbyManager } from '@/managers/lobby.manager';
import { clientManager } from '@/managers/client.manager';
import { LobbySettingsService } from '@services/lobbySettings.service';
import { CardSetRepository } from '@/repositories/card-set.repository';
import { logger } from '@utils/logger';

export class Auth2Service {
  private lobbySettingsService = new LobbySettingsService();
  private cardSetRepository = new CardSetRepository();

  private static emitActionError(client: Client, errorName: string) {
    client.socket.emit(SERVER_EVENT_NAME.CouldntCreateOrJoinLobby);
    client.socket.emit(SERVER_EVENT_NAME.Notification, errorName, 'Error');
    clientManager.removeClient(client);
  }

  public async createLobby(owner: Client, language: string) {
    if (lobbyManager.getLobbyForSocketId(owner.socketId)) {
      Auth2Service.emitActionError(owner, 'lobby.userAlreadyInLobby');
      return;
    }

    const settings = this.lobbySettingsService.createDefaultSettings(language);

    let lobby: Lobby;
    try {
      const cardSets = await this.cardSetRepository.cardSetsForLanguage(settings.language);

      console.log(cardSets);
      lobby = new Lobby(owner, settings);
      lobbyManager.addLobby(lobby);
    } catch (e) {
      lobbyManager.removeLobby(lobby);
      logger.error('[CREATE LOBBY] Error while creating lobby', { error: e });
      Auth2Service.emitActionError(owner, 'lobby.userAlreadyInLobby'); // TODO Change error name
    }
  }

  public joinLobby(client: Client, lobbyId: string) {
    const lobby = lobbyManager.getLobby(lobbyId);

    if (!lobby) {
      Auth2Service.emitActionError(client, 'lobby.doesntExist');
      return;
    }

    // Add client to lobby
    try {
      lobby.addClient(client);
    } catch (e) {
      Auth2Service.emitActionError(client, e.message);
    }
  }
}
