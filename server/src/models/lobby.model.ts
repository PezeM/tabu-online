import { Client } from '@models/client.model';
import { generateRandomId } from '../../../shared/utils/uuid';

export class Lobby {
  public readonly id = generateRandomId();

  private _members: Client[] = [];
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
}
