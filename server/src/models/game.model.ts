import { Card } from '@models/card.model';
import { Lobby } from '@models/lobby.model';
import { generateRandomId } from '@shared/utils';
import { Player } from '@models/player.model';
import { MAX_SKIPS_NUMBER, SERVER_EVENT_NAME } from '@shared/constants';
import { logGame, logger, logPlayer } from '@utils/logger';
import { sortPlayers } from '@utils/player.utils';
import { Team } from '@shared/enums';
import { GameSettings } from '@shared/types';
import { pick } from '@utils/util';
import { ClientPayload } from '@shared/interfaces';
import { GameTeam } from '@models/game-team.model';
import { GameCP, GameTeamCP } from '@shared/dto';
import { getOppositeTeam } from '@shared/utils/team';

export class Game implements ClientPayload<GameCP> {
  public readonly id = generateRandomId();
  private readonly _cards: Card[];
  private _currentCardIndex = -1;
  private _currentPlayer: Player;
  private _currentPlayerIndex = -1;
  private _settings: GameSettings;
  private _teamMap: Map<Team, GameTeam>;
  private _started: boolean;

  constructor(cards: Card[], lobby: Lobby) {
    this._cards = cards;
    this._started = false;
    this._settings = pick(lobby.settings, ['roundTime', 'pointsToWin', 'maximumNumberOfSkips']);
    this._players = sortPlayers(
      lobby.members.map(m => {
        m.socket.join(this.id);
        return new Player(m);
      }),
    );

    this._teamMap = new Map<Team, GameTeam>([
      [Team.Red, new GameTeam(Team.Red, this.getPlayersForTeam(Team.Red))],
      [Team.Blue, new GameTeam(Team.Blue, this.getPlayersForTeam(Team.Blue))],
    ]);

    lobby.setNewGame(this);
  }

  private _currentCard: Card;

  get currentCard() {
    return this._currentCard;
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

  public getPlayersForTeam(team: Team, exceptPlayer?: Player): Player[] {
    const players = this._players.filter(p => p.team === team);
    if (exceptPlayer) {
      return this._players.filter(p => p.id !== exceptPlayer.id);
    }

    return players;
  }

  public removePlayer(socketId: string) {
    const player = this.getPlayerBySocketId(socketId);

    if (!player) return;

    this._players = this._players.filter(p => p === player);

    player.socket.emit(SERVER_EVENT_NAME.PlayerLeftGame);
    player.socket.to(this.id).emit(SERVER_EVENT_NAME.GamePlayerLeft, player.id);
    logger.debug('Player left the game', logPlayer(player), logGame(this));
  }

  public newCardTurn() {
    this.selectNextCard();

    const guessingTeam = this._teamMap.get(this._currentPlayer.team);
    const guessingTeamPlayers = guessingTeam.players.filter(p => p.id !== this._currentPlayer.id);
    const enemyTeamPlayers = this._teamMap.get(getOppositeTeam(guessingTeam.team)).players;

    this._currentPlayer.socket.emit(SERVER_EVENT_NAME.GameRoundExplainerPerson, this._currentCard);

    for (const guessingTeamPlayer of guessingTeamPlayers) {
      guessingTeamPlayer.socket.emit(SERVER_EVENT_NAME.GameGuessingTeamPlayer);
    }

    for (const enemyTeamPlayer of enemyTeamPlayers) {
      enemyTeamPlayer.socket.emit(SERVER_EVENT_NAME.GameEnemyTeamPlayer, this._currentCard);
    }
  }

  public startRound() {
    this.selectNextPlayer();
    this.newCardTurn();

    // Start the timer or so, the timer should end the round with screen to start the next round
  }

  public getCP(): GameCP {
    return {
      id: this.id,
      roundTime: this._settings.roundTime,
      pointsToWin: this._settings.pointsToWin,
      maximumNumberOfSkips: this._settings.maximumNumberOfSkips,
    };
  }

  public emitStartGameEvent() {
    if (this._started) {
      logger.warn('Cant start already started game', logGame(this));
      return;
    }

    const teamMap = this.getTeamMapCP();

    for (const player of this._players) {
      player.socket.emit(SERVER_EVENT_NAME.GameStarted, this.getCP(), player.getCP(), teamMap);
    }

    this.startRound();
    this._started = true;
  }

  public checkIfCanSkipCurrentCard(player: Player) {
    if (this._settings.maximumNumberOfSkips === MAX_SKIPS_NUMBER) return true;
    const gameTeam = this._teamMap.get(player.team);
    return gameTeam.numberOfSkips < this._settings.maximumNumberOfSkips;
  }

  public skipCurrentCard(player: Player) {
    const gameTeam = this._teamMap.get(player.team);
    gameTeam.numberOfSkips++;
    player.increaseNumberOfSkips();
  }

  public emitGameTeam(player: Player) {
    const gameTeam = this._teamMap.get(player.team);
    if (!gameTeam) return;
    for (const p of this._players) {
      p.socket.emit(SERVER_EVENT_NAME.GameUpdateGameTeam, gameTeam.getCP());
    }
  }

  private selectNextCard() {
    const nextIndex = this.getNextCardIndex();
    const nextCard = this._cards[nextIndex];

    if (!nextCard || nextCard === this._currentCard) {
      // End of the game
    }

    this._currentCard = nextCard;
  }

  private getNextCardIndex(): number {
    const index = Math.min(++this._currentCardIndex, this.maxCardIndex);
    this._currentPlayerIndex = index;
    return index;
  }

  private selectNextPlayer() {
    const nextIndex = this.getNextPlayerIndex();
    this._currentPlayer = this._players[nextIndex];
  }

  private getNextPlayerIndex(): number {
    let newPlayerIndex = ++this._currentPlayerIndex;
    if (newPlayerIndex >= this._players.length) {
      newPlayerIndex = 0;
    }

    this._currentPlayerIndex = newPlayerIndex;
    return newPlayerIndex;
  }

  private getTeamMapCP(): Record<Team, GameTeamCP> {
    const result = {};

    for (const [key, value] of this._teamMap.entries()) {
      result[key] = value.getCP();
    }

    return result as Record<Team, GameTeamCP>;
  }
}
