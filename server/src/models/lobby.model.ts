import { Client } from '@models/client.model';
import { generateRandomId } from '@shared/utils/uuid';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { ClientPayload } from '@shared/interfaces/clientPayload';
import { LobbyCP } from '@shared/dto/lobby.dto';

export class Lobby implements ClientPayload<LobbyCP> {
  public readonly id = generateRandomId();

  private _members: Client[] = [];
  private _blacklist: Client[] = [];
  private _isInGame: boolean;
  private _ownerId: string;

  constructor(owner: Client) {
    this._members.push(owner);
    this._ownerId = owner.id;
    owner.socket.join(this.id);
    owner.socket.emit(SERVER_EVENT_NAME.UserJoinLobby, this.getCP());
    owner.socket.to(this.id).emit(SERVER_EVENT_NAME.UserJoinedLobby, owner.getCP());
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
    client.socket.emit(SERVER_EVENT_NAME.UserJoinLobby, this.getCP());
    client.socket.to(this.id).emit(SERVER_EVENT_NAME.UserJoinedLobby, client.getCP());
  }

  public getCP(): LobbyCP {
    return {
      id: this.id,
      ownerId: this._ownerId,
      members: this._members.map(c => c.getCP()),
    };
  }
}
