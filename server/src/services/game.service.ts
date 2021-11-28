import { Game } from '@models/game.model';
import { ClientSocket } from '@interfaces/socket.interface';
import { SERVER_EVENT_NAME } from '@shared/constants';
import { IsCurrentCard } from '@utils/game.decorator';

export class GameService {
  @IsCurrentCard()
  public skipCard(socket: ClientSocket, game: Game, _cardName: string) {
    const player = game.getPlayerBySocketId(socket.id);
    if (!player) return;

    if (!game.checkIfCanSkipCurrentCard(player)) {
      socket.emit(SERVER_EVENT_NAME.Notification, 'error.cantSkipMoreCard', 'warning');
      return;
    }

    game.skipCurrentCard(player);
    game.startNewCardTurn();
    game.emitToPlayerTeam(player);
  }

  @IsCurrentCard()
  public validAnswer(socket: ClientSocket, game: Game, _cardName: string) {
    const player = game.getPlayerBySocketId(socket.id);
    if (!player) return;

    if (game.handleValidAnswer(player)) {
      game.startNewCardTurn();
      game.emitToPlayerTeam(player);
    }
  }

  @IsCurrentCard()
  public forbiddenWordUsed(socket: ClientSocket, game: Game, _cardName: string) {
    const player = game.getPlayerBySocketId(socket.id);
    if (!player) return;

    if (!game.isRoundStarted) {
      return;
    }

    game.startNewCardTurn();
  }

  public startNextRound(socket: ClientSocket, game: Game) {
    const player = game.getPlayerBySocketId(socket.id);
    if (!player) return;

    game.tryStartNextRound();
  }
}
