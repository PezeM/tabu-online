import { Client } from '@models/client.model';
import { generateRandomId } from '@shared/utils/uuid';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { ClientPayload } from '@shared/interfaces/clientPayload';
import { LobbyCP } from '@shared/dto/lobby.dto';
import { lobbyManager } from '@/managers/lobby.manager';
import { LobbySettings } from '@shared/interfaces/lobby';
import { LobbySettingsService } from '@services/lobbySettings.service';

export class Lobby implements ClientPayload<LobbyCP> {
  public readonly id = generateRandomId();

  private _members: Client[] = [];
  private _blacklist: Client[] = [];
  private _isInGame: boolean;
  private _ownerId: string;
  private _settings: LobbySettings;

  constructor(owner: Client, language: string) {
    this._settings = new LobbySettingsService().createDefaultSettings(language);
    this._ownerId = owner.id;

    this.addNewMemberInternal(owner);
  }

  get members() {
    return this._members;
  }

  get membersCount(): number {
    return this._members.length;
  }

  public getMember(clientId: string): Client | undefined {
    return this._members.find(c => c.id === clientId);
  }

  public isOwner(client: Client): boolean {
    if (!client) return false;
    return client.id === this._ownerId;
  }

  public addClient(client: Client): void {
    if (this._isInGame) throw new Error('lobby.alreadyInGame');
    if (this._members.length >= this._settings.maxPlayers) throw new Error('lobby.roomIsFull');
    if (this._members.includes(client)) throw new Error('lobby.alreadyInThisRoom');
    if (this._blacklist.includes(client)) throw new Error('lobby.userInBlacklist');

    this.addNewMemberInternal(client);
  }

  public remove(client: Client): boolean {
    // Select new owner if old one leaves
    if (client.id === this._ownerId) {
      const newOwner = this._members.find(c => c.id !== this._ownerId);
      if (newOwner) {
        this._ownerId = newOwner.id;
      }
    }

    client.socket.emit(SERVER_EVENT_NAME.UserLeftRoom);
    client.socket.to(this.id).emit(SERVER_EVENT_NAME.LobbyUserLeft, client.id, this._ownerId);
    this._members = this._members.filter(c => c !== client);

    // Remove lobby if all members left
    if (this.membersCount === 0) lobbyManager.removeLobby(this);

    return true;
  }

  public kick(clientId: string): void {
    if (this._ownerId === clientId) throw new Error('lobby.cantKickOwner');

    const clientToRemove = this.getMember(clientId);
    if (!clientToRemove) {
      throw new Error('lobby.userNotFound');
    }

    if (this.remove(clientToRemove)) {
      this._blacklist.push(clientToRemove);
      clientToRemove.socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.kicked', 'Info');
    }
  }

  public getCP(): LobbyCP {
    return {
      id: this.id,
      ownerId: this._ownerId,
      members: this._members.map(c => c.getCP()),
      settings: this._settings,
    };
  }

  private addNewMemberInternal(client: Client) {
    this._members.push(client);
    client.socket.join(this.id);

    const clientCP = client.getCP();

    client.socket.emit(SERVER_EVENT_NAME.UserJoinLobby, this.getCP(), clientCP);
    client.socket.to(this.id).emit(SERVER_EVENT_NAME.UserJoinedLobby, clientCP);
  }
}
