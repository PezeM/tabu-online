import { Card } from '@models/card.model';
import { Lobby } from '@models/lobby.model';
import { generateRandomId } from '@shared/utils';
import { Player } from '@models/player.model';
import { SERVER_EVENT_NAME } from '@shared/constants';
import { logGame, logger, logPlayer } from '@utils/logger';
import { sortPlayers } from '@utils/player.utils';
import { Team } from '@shared/enums';
import { LobbySettings } from '@shared/interfaces';

export class Game {
  public readonly id = generateRandomId();
  private readonly _cards: Card[];
  private _currentCard: Card;
  private _currentCardIndex = -1;
  private _currentPlayerIndex = 0;
  private _settings: LobbySettings;

  constructor(cards: Card[], lobby: Lobby) {
    this._cards = cards;
    this._settings = lobby.settings;
    this._players = sortPlayers(
      lobby.members.map(m => {
        m.socket.join(this.id);
        return new Player(m);
      }),
    );

    this.selectNextCard();
    lobby.setNewGame(this);
  }

  private _players: Player[];

  get players() {
    return this._players;
  }

  get maxCardIndex() {
    return this._cards.length - 1;
  }

  public getPlayer(playerId: string): Player | undefined {
    return this._players.find(p => p.id === playerId);
  }

  public getPlayerBySocketId(socketId: string): Player | undefined {
    return this._players.find(p => p.socketId === socketId);
  }

  public getPlayersForTeam(team: Team): Player[] {
    return this._players.filter(p => p.team === team);
  }

  public selectNextCard() {
    const nextIndex = this.getNextCardIndex();
    const nextCard = this._cards[nextIndex];

    if (!nextCard || nextCard === this._currentCard) {
      // End of the game
    }

    this._currentCard = nextCard;
  }

  public removePlayer(socketId: string) {
    const player = this.getPlayerBySocketId(socketId);

    if (!player) return;

    this._players = this._players.filter(p => p === player);

    player.socket.emit(SERVER_EVENT_NAME.PlayerLeftGame);
    player.socket.to(this.id).emit(SERVER_EVENT_NAME.GamePlayerLeft, player.id);
    logger.debug('Player left the game', logPlayer(player), logGame(this));
  }

  public emitStartGameEvent() {
    // Game payload
    // Emit event to current player with current card
    // Emit event to enemy team with current card and flag they are the enemy team
  }

  private getNextCardIndex(): number {
    return Math.min(++this._currentCardIndex, this.maxCardIndex);
  }
}
