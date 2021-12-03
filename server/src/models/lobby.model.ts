import { Client } from '@models/client.model';
import { generateRandomId } from '@shared/utils/uuid';
import { SERVER_EVENT_NAME } from '@shared/constants/events';
import { ClientPayload } from '@shared/interfaces/clientPayload';
import { LobbyCP } from '@shared/dto/lobby.dto';
import { lobbyManager } from '@/managers/lobby.manager';
import { LobbySettings } from '@shared/interfaces/lobby';
import { CardSetsCountDto } from '@shared/dto';
import { Game } from '@models/game.model';
import { LobbyAddClientException, LobbyKickClientException } from '@/exceptions';
import { app } from '@/server';
import { isEmpty } from '@utils/util';

export class Lobby implements ClientPayload<LobbyCP> {
  public readonly id = generateRandomId();

  public readonly password?: string;
  private _blacklist: Client[] = [];
  private _ownerId: string;
  private _game?: Game;

  constructor(
    owner: Client,
    public settings: LobbySettings,
    cardSets: CardSetsCountDto[],
    password?: string,
  ) {
    this._ownerId = owner.id;
    this._cardSets = cardSets;
    this.password = isEmpty(password) ? undefined : password;

    this.addNewMemberInternal(owner);
  }

  private _members: Client[] = [];

  get members() {
    return this._members;
  }

  private _cardSets: CardSetsCountDto[] = [];

  get cardSets(): CardSetsCountDto[] {
    return this._cardSets;
  }

  set cardSets(value: CardSetsCountDto[]) {
    this._cardSets = value;
    this.getMember(this._ownerId)?.socket?.emit(SERVER_EVENT_NAME.UpdateCardSets, this._cardSets);
  }

  get membersCount(): number {
    return this._members.length;
  }

  get isGameStarted(): boolean {
    return this._game !== undefined;
  }

  public getMember(clientId: string): Client | undefined {
    return this._members.find(c => c.id === clientId);
  }

  public isOwner(client: Client): boolean {
    if (!client) return false;
    return client.id === this._ownerId;
  }

  public addClient(client: Client): void {
    if (this.isGameStarted) throw new LobbyAddClientException(client.id, 'lobby.alreadyInGame');
    if (this._members.length >= this.settings.maxPlayers)
      throw new LobbyAddClientException(client.id, 'lobby.roomIsFull');
    if (this._members.includes(client))
      throw new LobbyAddClientException(client.id, 'lobby.alreadyInThisRoom');
    if (this._blacklist.includes(client))
      throw new LobbyAddClientException(client.id, 'lobby.userInBlacklist');

    this.addNewMemberInternal(client);
  }

  public removeClient(client: Client): void {
    // Select new owner if old one leaves
    if (client.id === this._ownerId) {
      const newOwner = this._members.find(c => c.id !== this._ownerId);
      if (newOwner) {
        this._ownerId = newOwner.id;
        this.cardSets = this._cardSets;
      }
    }

    client.socket.leave(this.id);
    client.socket.emit(SERVER_EVENT_NAME.UserLeftRoom);
    app.ioServer().to(this.id).emit(SERVER_EVENT_NAME.LobbyUserLeft, client.id, this._ownerId);
    this._members = this._members.filter(c => c !== client);

    // Remove lobby if all members left
    if (this.membersCount === 0) lobbyManager.removeLobby(this);
  }

  public kickClient(clientId: string): void {
    if (this._ownerId === clientId) throw new LobbyKickClientException('lobby.cantKickOwner');

    const clientToRemove = this.getMember(clientId);
    if (!clientToRemove) {
      throw new LobbyKickClientException('lobby.userNotFound');
    }

    this.removeClient(clientToRemove);
    this._blacklist.push(clientToRemove);
    clientToRemove.socket.emit(SERVER_EVENT_NAME.Notification, 'lobby.kicked', 'info');
  }

  public setNewGame(game?: Game) {
    this._game = game;
  }

  public getCP(): LobbyCP {
    return {
      id: this.id,
      ownerId: this._ownerId,
      members: this._members.map(c => c.getCP()),
      settings: this.settings,
    };
  }

  private addNewMemberInternal(client: Client) {
    this._members.push(client);
    client.socket.join(this.id);

    const clientCP = client.getCP();
    const cardSets = this.isOwner(client) ? this._cardSets : undefined;

    client.socket.emit(SERVER_EVENT_NAME.UserJoinLobby, this.getCP(), clientCP, cardSets);
    client.socket.to(this.id).emit(SERVER_EVENT_NAME.UserJoinedLobby, clientCP);
  }
}
