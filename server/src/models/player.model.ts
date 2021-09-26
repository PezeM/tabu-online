import { Client } from '@models/client.model';
import { Team } from '@shared/enums';
import { generateRandomId } from '@shared/utils';
import { ClientSocket } from '@interfaces/socket.interface';
import { ClientPayload } from '@shared/interfaces';
import { PlayerCP } from '@shared/dto/player.dto';

export class Player implements ClientPayload<PlayerCP> {
  public readonly id: string;
  public readonly team: Team;
  public readonly username: string;

  constructor(client: Client) {
    this.id = generateRandomId();
    this.team = client.team;
    this.username = client.username;
    this._socket = client.socket;

    // Stats:
    // Number of skips
    // Avg time in seconds per card
    // Number of times the player was showing card
  }

  private readonly _socket: ClientSocket;

  get socket() {
    return this._socket;
  }

  get socketId() {
    return this._socket.id;
  }

  public getCP(): PlayerCP {
    return {
      id: this.id,
      username: this.username,
      team: this.team,
    };
  }
}
