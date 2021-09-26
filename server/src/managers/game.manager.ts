import { isEmpty } from '@utils/util';
import { Game } from '@models/game.model';
import { Player } from '@models/player.model';

class GameManager {
  private _games: Map<string, Game>;

  constructor() {
    this._games = new Map();
  }

  public addGame(game: Game): Game {
    if (isEmpty(game)) throw new Error('Game object is empty');

    this._games.set(game.id, game);

    return game;
  }

  public removeGame(game: Game): boolean {
    if (isEmpty(game)) throw new Error('Game object is empty');

    return this._games.delete(game.id);
  }

  public getGame(id: string): Game | undefined {
    return this._games.get(id);
  }

  /**
   * Return game that the user is in
   * @param {string} socketId The socket id
   * @returns {Game | undefined} Returns game if user is in any game, undefined if he is not in game
   */
  public getGameForSocketId(socketId: string): Game | undefined {
    for (const game of this._games.values()) {
      if (game.players.some(p => p.socketId === socketId)) {
        return game;
      }
    }
  }

  public getGameForClient(player: Player): Game | undefined {
    if (!player) return;

    for (const game of this._games.values()) {
      if (game.getPlayer(player.id)) {
        return game;
      }
    }
  }
}

export const gameManager = new GameManager();
