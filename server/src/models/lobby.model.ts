import { Client } from '@models/client.model';
import { generateRandomId } from '../../../shared/utils/uuid';
import { SERVER_EVENT_NAME } from '../../../shared/constants/events';

export class Lobby {
  public readonly id = generateRandomId();

  private _members: Client[] = [];
  private _blacklist: Client[] = [];
  private _isInGame: boolean;
  private _ownerId: string;

  constructor(owner: Client) {
    this._members.push(owner);
    this._ownerId = owner.id;
    owner.socket.join(this.id);
  }

  get members() {
    return this._members;
  }

  get membersCount(): number {
    return this._members.length;
  }

  public addClient(client: Client): void {
    if (this._isInGame) throw new Error('errLobbyInGame');
    if (this._members.includes(client)) throw new Error('errAlreadyInThisRoom');
    if (this._blacklist.includes(client)) throw new Error('errRoomBlacklisted');
    // TODO: Add check for maximum number of players

    this._members.push(client);
    client.socket.join(this.id);
    client.socket.emit(SERVER_EVENT_NAME.UserJoinLobby);
    client.socket.to(this.id).emit(SERVER_EVENT_NAME.UserJoinedLobby, client.id);
  }
}
