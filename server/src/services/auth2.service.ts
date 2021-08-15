import { Client } from '@models/client.model';
import { Lobby } from '@models/lobby.model';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { lobbyManager } from '@/managers/lobby.manager';
import { clientManager } from '@/managers/client.manager';
import { LobbySettingsService } from '@services/lobbySettings.service';
import { CardSetRepository } from '@/repositories/card-set.repository';

export class Auth2Service {
  private lobbySettingsService = new LobbySettingsService();
  private cardSetRepository = new CardSetRepository();

  public async createLobby(owner: Client, language: string) {
    if (lobbyManager.getLobbyForSocketId(owner.socketId)) {
      this.emitActionError(owner, 'lobby.userAlreadyInLobby');
      return;
    }

    const settings = this.lobbySettingsService.createDefaultSettings(language);

    try {
      const cardSets = await this.cardSetRepository.cardSetsForLanguage(settings.language);

      console.log(cardSets);
      const lobby = new Lobby(owner, settings);
      lobbyManager.addLobby(lobby);
    } catch (e) {
      // Remove client
      console.log('some error', e);
      this.emitActionError(owner, 'lobby.userAlreadyInLobby'); // TODO Change error name
    }
  }

  public joinLobby(client: Client, lobbyId: string) {
    const lobby = lobbyManager.getLobby(lobbyId);

    if (!lobby) {
      this.emitActionError(client, 'lobby.doesntExist');
      return;
    }

    // Add client to lobby
    try {
      lobby.addClient(client);
    } catch (e) {
      this.emitActionError(client, e.message);
    }
  }

  private emitActionError(client: Client, errorName: string) {
    client.socket.emit(SERVER_EVENT_NAME.CouldntCreateOrJoinLobby);
    client.socket.emit(SERVER_EVENT_NAME.Notification, errorName, 'Error');
    clientManager.removeClient(client);
  }
}
