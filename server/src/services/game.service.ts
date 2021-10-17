import { Game } from '@models/game.model';
import { ClientSocket } from '@interfaces/socket.interface';

export class GameService {
  public skipCard(socket: ClientSocket, game: Game, cardName: string) {
    if (!this.isCurrentCard(game, cardName)) {
      return;
    }

    const player = game.getPlayerBySocketId(socket.id);
    if (!player) return;

    // Check if can skip
    // Increase game teams skip
    // Increase player skip
    game.newCardTurn();
  }

  private isCurrentCard(game: Game, cardName: string): boolean {
    if (!game.currentCard) return false;
    return game.currentCard.name === cardName;
  }
}
