import { Client } from '@models/client.model';
import { Team } from '@shared/enums';
import { generateRandomId } from '@shared/utils';
import { ClientSocket } from '@interfaces/socket.interface';
import { ClientPayload } from '@shared/interfaces';
import { PlayerCP, PlayerStatsCP } from '@shared/dto/player.dto';

export class Player implements ClientPayload<PlayerCP> {
  public readonly id: string;
  public readonly team: Team;
  public readonly username: string;

  private _numberOfSkips = 0;
  private _timesShowingCard = 0;
  private readonly _socket: ClientSocket;

  constructor(client: Client) {
    this.id = generateRandomId();
    this.team = client.team;
    this.username = client.username;
    this._socket = client.socket;
  }

  get socket() {
    return this._socket;
  }

  get socketId() {
    return this._socket.id;
  }

  public increaseNumberOfSkips() {
    this._numberOfSkips++;
  }

  public increaseTimesShowingCards() {
    this._timesShowingCard++;
  }

  public getCP(): PlayerCP {
    return {
      id: this.id,
      username: this.username,
      team: this.team,
    };
  }

  public getStatsCP(): PlayerStatsCP {
    return {
      username: this.username,
      team: this.team,
      numberOfSkips: this._numberOfSkips,
      timesShowingCard: this._timesShowingCard,
    };
  }
}
