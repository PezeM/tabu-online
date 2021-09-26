import { Lobby } from '@models/lobby.model';
import { Client } from '@models/client.model';
import { CardSetRepository } from '@/repositories/card-set.repository';
import { shuffleArray } from '@shared/utils/array';
import { Game } from '@models/game.model';
import { gameManager } from '@/managers/game.manager';
import { logError, logger, logLobby } from '@utils/logger';
import { SERVER_EVENT_NAME } from '@shared/constants';

export class GameCreateService {
  private _cardSetRepository = new CardSetRepository();

  public async createNewGame(lobby: Lobby, client: Client) {
    const cards = await this._cardSetRepository.getCardsWithIds(lobby.settings.cardIds);
    shuffleArray(cards);

    let game;
    try {
      game = new Game(cards, lobby);
      gameManager.addGame(game);
    } catch (e) {
      logger.error('Error while creating new game', logError(e), logLobby(lobby));
      gameManager.removeGame(game);
      lobby.setNewGame(undefined);
      client.socket.emit(SERVER_EVENT_NAME.ErrorCreatingGame, 'error.errorCreatingGame');
    }
  }
}
