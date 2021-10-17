import { Game } from '@models/game.model';
import { ClientSocket } from '@interfaces/socket.interface';
import { SERVER_EVENT_NAME } from '@shared/constants';

export class GameService {
  public skipCard(socket: ClientSocket, game: Game, cardName: string) {
    if (!GameService.isCurrentCard(game, cardName)) {
      return;
    }

    const player = game.getPlayerBySocketId(socket.id);
    if (!player) return;

    if (!game.checkIfCanSkipCurrentCard(player)) {
      socket.emit(SERVER_EVENT_NAME.Notification, 'error.cantSkipMoreCard', 'warning');
      return;
    }

    game.skipCurrentCard(player);
    game.newCardTurn();
    game.emitGameTeam(player);
  }

  private static isCurrentCard(game: Game, cardName: string): boolean {
    if (!game.currentCard) return false;
    return game.currentCard.name === cardName;
  }
}
