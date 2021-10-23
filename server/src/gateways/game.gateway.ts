import { Gateway, OnEvent } from '@utils/gateway.decorator';
import { CLIENT_EVENT_NAME } from '@shared/constants';
import { ClientSocket } from '@interfaces/socket.interface';
import { gameManager } from '@/managers/game.manager';
import { GameService } from '@services/game.service';

@Gateway
export class GameGateway {
  private _gameService = new GameService();

  @OnEvent(CLIENT_EVENT_NAME.GameSkipCard)
  private onGameSkipCard(socket: ClientSocket, cardName: string) {
    const game = gameManager.getGameForSocketId(socket.id);
    if (!game) return;

    this._gameService.skipCard(socket, game, cardName);
  }

  @OnEvent(CLIENT_EVENT_NAME.GameValidAnswer)
  private onGameValidAnswer(socket: ClientSocket, cardName: string) {
    const game = gameManager.getGameForSocketId(socket.id);
    if (!game) return;

    this._gameService.validAnswer(socket, game, cardName);
  }

  @OnEvent(CLIENT_EVENT_NAME.GameForbiddenWordUsed)
  private onGameForbiddenWordUsed(socket: ClientSocket, cardName: string) {
    const game = gameManager.getGameForSocketId(socket.id);
    if (!game) return;

    this._gameService.forbiddenWordUsed(socket, game, cardName);
  }

  @OnEvent(CLIENT_EVENT_NAME.GameStartNextRound)
  private onGameStartNextRound(socket: ClientSocket) {
    const game = gameManager.getGameForSocketId(socket.id);
    if (!game) return;

    this._gameService.startNextRound(socket, game);
  }

  @OnEvent(CLIENT_EVENT_NAME.Disconnect)
  protected onDisconnect(socket: ClientSocket) {
    const game = gameManager.getGameForSocketId(socket.id);
    if (!game) return;

    game.removePlayer(socket.id);
  }
}
